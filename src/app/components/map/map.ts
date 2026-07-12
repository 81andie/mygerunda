import { AfterViewInit, Component, inject, OnInit, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import { signal } from '@angular/core';

import Style from 'ol/style/Style';
import OverviewMap from 'ol/control/OverviewMap.js';
import { defaults as defaultControls } from 'ol/control/defaults.js';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import { PernotacionesGeoService } from '../../../services/PernoctacionesGeo.service';
import { HotelGeometry, HotelProperties } from '../../../interfaces/hotels.interface';
import { HosteleriaGeoService } from '../../../services/HosteleriaGeo.service';
import { PuntsInteresGeoService } from '../../../services/PuntsInteresGeo.service';
import CircleStyle from 'ol/style/Circle';
import { NavbarMap } from "../navbar-map/navbar-map";
import { Drawers } from "../drawer/drawer";
import { MapStateService } from '../../../services/MapState.service';
import { forkJoin } from 'rxjs';
import { MapFilterService } from '../../../services/map-filter.service';




@Component({
  selector: 'app-map',
  imports: [CommonModule, NavbarMap, Drawers],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent implements AfterViewInit, OnInit {



  private HotelsGeoService = inject(PernotacionesGeoService)
  private CafeteriesGeoService = inject(HosteleriaGeoService)
  private PuntsInteresService = inject(PuntsInteresGeoService)
  public MapState = inject(MapStateService)
  public mapfilter = inject(MapFilterService)

  allPlaces: any[] = []

  constructor() {
    console.log('MAP COMPONENT CREADO');
  }


  private markers: HotelGeometry[] = []
  private activeLayers: VectorLayer[] = [];
  private lastFeature?: Feature;
  private cdr = inject(ChangeDetectorRef);


  private destroyRef = inject(DestroyRef);

  selectedFeature = signal<Feature | null>(null);

  public isSidebarVisible: boolean = false;

  public hotels: any = {};
  public mostRelevant: any = {}



  private source = new OSM();

  private overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: this.source,
      }),
    ],


  })


  private map: Map | null = null;
  activeButton = '';



  ngAfterViewInit(): void {


    this.map = new Map({
      controls: defaultControls().extend([this.overviewMapControl]),
      layers: [
        new TileLayer({
          source: this.source,
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([2.821, 41.987]),
        zoom: 15,
      }),
    });


    this.map?.on('click', (evt) => {
      const feature = this.map?.forEachFeatureAtPixel(evt.pixel, (feature) => feature as Feature,

      );


      /*if(feature){
      feature.setStyle(new Style({

        image: new Icon({
          src: "marker.svg",
          scale: 0.7
        }),

      }));*/

      if (this.lastFeature) {
        this.lastFeature.setStyle(new Style({

          image: new CircleStyle({
            radius: 6,

            fill: new Fill({
              color: '#F54927',
            }),
            stroke: new Stroke({
              color: '#F54927',
              width: 2,

            }),

          })
        })
        )
        this.lastFeature = undefined;
      }

      if (feature) {

        const place = {
          name: feature.get('name'),
          image: feature.get('image'),
          telf: feature.get('telf'),
          url: feature.get('url'),
          direccio: feature.get('direccio'),
          email: feature.get('email')
        };

        console.log(place);

        this.MapState.selectedPlace.set(place);


        console.log('HE PULSADO UN MARKER');

        this.MapState.selectedPlace.set({
          name: feature.get('name'),
          image: feature.get('image'),
          telf: feature.get('telf'),
          url: feature.get('url'),
          direccio: feature.get('direccio'),
          email: feature.get('email')
        });

        feature.setStyle(new Style({

          image: new Icon({
            src: "marker.svg",
            //size:[64,64],
            scale: 0.7,
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction'
          }),

        }));
        this.lastFeature = feature;
      } else {
        this.MapState.selectedPlace.set(null)

      }

    })


    this.mapfilter.filter$

      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filter => {

        if (filter) {
          this.onButtonClick(filter);
        }

      })


  }


  ngOnInit(): void {

    this.prueba()

  }


  private clearLayers() {
    this.activeLayers.forEach(layer => {
      this.map?.removeLayer(layer);
    });

    this.activeLayers = [];
  }


  private addGeoLayer(data: any) {

    const features = data.features.map((item: any) => {

      const feature = new Feature({
        geometry: new Point(fromLonLat([item.geometry.coordinates[0], item.geometry.coordinates[1]]))
      })


      feature.setProperties({
        name: item.properties.name,
        image: item.properties.img,
        email: item.properties.email,
        telf: item.properties.telf,
        url: item.properties.url,
        direccio: item.properties.direccio
      });

      feature.setStyle(new Style({

        image: new CircleStyle({
          radius: 7,

          fill: new Fill({
            color: '#F54927',
          }),
          stroke: new Stroke({
            color: '#F54927',
            width: 3,

          }),
        }),





      }));

      return feature

    })

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map?.addLayer(vectorLayer)
    this.activeLayers.push(vectorLayer);

    // a partir de aqui




  }

  cargarBtnHoteles() {
    this.clearLayers(); // opcional
    this.activeButton = 'hoteles';

    this.HotelsGeoService.getLocalizationHotels().subscribe(data => {
      this.addGeoLayer(data);


    });
  }


  cargarBtnPensiones() {
    this.clearLayers(); // opcional

    this.activeButton = 'pensiones';

    this.HotelsGeoService.getLocalizationPensiones().subscribe(data => {
      this.addGeoLayer(data);







    });
  }


  cargarBtnApartments() {
    this.clearLayers(); // opcional

    this.activeButton = 'apartaments';

    this.HotelsGeoService.getLocalizationApartments().subscribe(data => {
      this.addGeoLayer(data);
    });
  }

  cargarBtnCafeteries() {

    this.clearLayers(); // opcional

    this.activeButton = 'cafeteries';

    this.CafeteriesGeoService.getLocalizationCafeteries().subscribe(data => {
      this.addGeoLayer(data);
    });

  }


  cargarBtnRestaurants() {

    this.clearLayers(); // opcional
    this.activeButton = 'restaurants';

    this.CafeteriesGeoService.getLocalizationRestaurants().subscribe(data => {
      this.addGeoLayer(data);
    });

  }


  cargarBtnPuntsInteres() {

    this.clearLayers(); // opcional

    this.activeButton = 'puntsInteres';

    this.PuntsInteresService.getLocalizationPuntsInteres().subscribe(data => {
      this.addGeoLayer(data);
      console.log(data.features)
    });

  }



  pruebaMostrarHotelAleatorio() {

    console.log(this.allPlaces)

    this.HotelsGeoService.getLocalizationHotels().subscribe(data => {

      const hoteles = data.features

      //  console.log(hoteles.length)

      const hoy = new Date();

      const semilla = hoy.getFullYear() * 1000 + hoy.getMonth() * 100 + hoy.getDate();

      let prueba = semilla % hoteles.length + 1;
      console.log(prueba)

      // let hotelAleatorio = Math.floor(Math.random() * hoteles.length);
      let hotelString = prueba.toString()


      hoteles.forEach((item) => {
        //  console.log(hotelString)
        if (item.properties.id === hotelString) {
          this.hotels = item.properties
          this.cdr.detectChanges();

        }
      })
      console.log('HOTEL:', this.hotels);
    })


  }



  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log("hola")
  }

  onButtonClick(boton: string) {

    switch (boton) {

      case 'hoteles':
        this.cargarBtnHoteles();
        break;

      case 'pensiones':
        this.cargarBtnPensiones();
        break;

      case 'apartaments':
        this.cargarBtnApartments();
        break;

      case 'restaurants':
        this.cargarBtnRestaurants();
        break;

      case 'cafeteries':
        this.cargarBtnCafeteries();
        break;

      case 'puntsInteres':
        this.cargarBtnPuntsInteres();
        break;

    }

  }


  prueba() {

    forkJoin({
      hoteles: this.HotelsGeoService.getLocalizationHotels(),
      pensiones: this.HotelsGeoService.getLocalizationPensiones(),
      apartamentos: this.HotelsGeoService.getLocalizationApartments(),
      cafeterias: this.CafeteriesGeoService.getLocalizationCafeteries(),
      restaurantes: this.CafeteriesGeoService.getLocalizationRestaurants(),
      punts: this.PuntsInteresService.getLocalizationPuntsInteres()
    }).subscribe(result => {

      this.allPlaces = [
        ...result.hoteles.features,
        ...result.pensiones.features,
        ...result.apartamentos.features,
        ...result.cafeterias.features,
        ...result.restaurantes.features,
        ...result.punts.features
      ];


      let allPlaces = this.allPlaces

      const hoy = new Date();

      const semilla = hoy.getFullYear() * 1000 + hoy.getMonth() * 100 + hoy.getDate();

      let prueba = semilla % allPlaces.length;

      this.mostRelevant = this.allPlaces[prueba].properties;
      this.cdr.detectChanges()

      setTimeout(() => {
        this.mostRelevant = null
        this.cdr.detectChanges()
      }, 10000)

    });
  }


}

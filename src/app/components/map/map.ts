import { AfterViewInit, Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';


import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

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




@Component({
  selector: 'app-map',
  imports: [CommonModule, NavbarMap],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent implements  AfterViewInit, OnInit {



  private HotelsGeoService = inject(PernotacionesGeoService)
  private CafeteriesGeoService = inject(HosteleriaGeoService)
  private PuntsInteresService = inject(PuntsInteresGeoService)
  private markers: HotelGeometry[] = []
  private activeLayers: VectorLayer[] = [];
  private lastFeature?: Feature;
  private cdr = inject(ChangeDetectorRef);

  public isSidebarVisible: boolean = false;

  public hotels:any ={};
  private source = new OSM();

  private overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: this.source,
      }),
    ],


  })


  private map: Map | null = null;


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




  }


  ngOnInit(): void {



this.pruebaMostrarHotelAleatorio()

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
        telf: item.properties.telf,
        url: item.properties.url
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

    const element = document.getElementById('popup')!;

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    this.map?.addOverlay(popup);

    let popover: { dispose: () => void; } | undefined;
    function disposePopover() {
      if (popover) {
        popover.dispose();
        popover = undefined;
      }
    }

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
        feature.setStyle(new Style({

          image: new Icon({
            src: "marker.svg",
            scale: 0.7
          }),

        }));
        this.lastFeature = feature;
      }






      disposePopover();
      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates()
        console.log(feature)
        // console.log(feature?.get('name'))
        console.log(feature?.get('url'))

        element.innerHTML = `
           <div class="w-64 space-y-4 font-sans bg-stone-100 rounded-lg">

           <!-- Label -->
            <p class="text-xs uppercase tracking-widest text-stone-400">
             Localización
            </p>

            <!-- Título -->
          <h2 class="text-lg font-semibold text-black leading-tight">
           ${feature?.get('name')}
          </h2>

          <!-- Imagen -->
        <div class="overflow-hidden rounded-lg border border-white/10">
          <img
        src="${feature?.get('image')}"
        class="w-full h-36 object-cover"
        alt="
        <strong>${feature?.get('name')}"
      >
        </div>

        <h2 class="text-lg font-semibold text-black leading-tight">
           ${feature?.get('telf')}
          </h2>

          <a href='${feature?.get('url')}'
              target="_blank"
              rel="noopener noreferrer"
              class="text-2xs font-semibold text-black leading-tight">
           ${feature?.get('url')}
          </a>

        </div>


          `
        popup.setPosition(coordinates);

      } else {
        popup.setPosition(undefined);
      }
    })


  }

  cargarBtnHoteles() {
    this.clearLayers(); // opcional

    this.HotelsGeoService.getLocalizationHotels().subscribe(data => {
      this.addGeoLayer(data);
    });
  }


  cargarBtnPensiones() {
    this.clearLayers(); // opcional

    this.HotelsGeoService.getLocalizationPensiones().subscribe(data => {
      this.addGeoLayer(data);
    });
  }


  cargarBtnApartments() {
    this.clearLayers(); // opcional

    this.HotelsGeoService.getLocalizationApartments().subscribe(data => {
      this.addGeoLayer(data);
    });
  }

  cargarBtnCafeteries() {

    this.clearLayers(); // opcional

    this.CafeteriesGeoService.getLocalizationCafeteries().subscribe(data => {
      this.addGeoLayer(data);
    });

  }


  cargarBtnRestaurants() {

    this.clearLayers(); // opcional

    this.CafeteriesGeoService.getLocalizationRestaurants().subscribe(data => {
      this.addGeoLayer(data);
    });

  }


  cargarBtnPuntsInteres() {

    this.clearLayers(); // opcional

    this.PuntsInteresService.getLocalizationPuntsInteres().subscribe(data => {
      this.addGeoLayer(data);
    });

  }



  pruebaMostrarHotelAleatorio() {

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
          this.hotels= item.properties
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



}








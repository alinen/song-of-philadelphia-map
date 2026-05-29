async function initializeCesium() {
  // https://blog.banesullivan.com/using-cesiumjs-without-a-cesiumion-token-open-access-tile-providers-a1fa70657319
    Cesium.Ion.defaultAccessToken = null; //await getText("cesium-read-key.txt");
    /* Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps */
    let CartoAttribution = 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'

    // Create ProviderViewModel based on different imagery sources
    // - these can be used without Cesium Ion
    var imageryViewModels = [];

    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'OpenStreetMap',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
        tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
          map of the world.\nhttp://www.openstreetmap.org',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: 'abc',
            minimumLevel: 0,
            maximumLevel: 19
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Positron',
        tooltip: 'CartoDB Positron basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/light_all/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Positron without labels',
        tooltip: 'CartoDB Positron without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/light_nolabels/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Dark Matter',
        tooltip: 'CartoDB Dark Matter basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_all/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Dark Matter without labels',
        tooltip: 'CartoDB Dark Matter without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Voyager',
        tooltip: 'CartoDB Voyager basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'Voyager without labels',
        tooltip: 'CartoDB Voyager without labels basemap',
        iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/5/15/12.png',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
            credit: CartoAttribution,
            minimumLevel: 0,
            maximumLevel: 18
        });
        }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: 'National Map Satellite',
        iconUrl: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/4/6/4',
        creationFunction: function() {
        return new Cesium.UrlTemplateImageryProvider({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
            credit: 'Tile data from <a href="https://basemap.nationalmap.gov/">USGS</a>',
            minimumLevel: 0,
            maximumLevel: 16
        });
      }
  }));
    const viewer = new Cesium.Viewer('cesiumContainer', {
      //terrain: Cesium.Terrain.fromWorldTerrain(),
      imageryProviderViewModels: imageryViewModels,
      selectedImageryProviderViewModel: imageryViewModels[7],
      timeline: false,
      animation: false,
      homeButton: false,
      scene3DOnly: true,
      selectionIndicator: false,
      geocoder: false,
      infoBox: true
    });    

    // Remove the Terrain section of the baseLayerPicker
    viewer.baseLayerPicker.viewModel.terrainProviderViewModels.removeAll()
    viewer.scene.postProcessStages.fxaa.enabled = true;
    return viewer;
}
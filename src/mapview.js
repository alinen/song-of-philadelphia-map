var _sopmaplocationid = 0;
var _selectedEp = null;
var sopInfoBoxIsShowing = false;

function ShowInfoBox(onOff, entity) {
    sopInfoBoxIsShowing = onOff;
    const element = document.getElementById("sopInfoBox");
    if (onOff) {
        const titleEle = document.getElementById("sopInfoBoxTitle");
        const contentsEle = document.getElementById("sopInfoBoxContents");
        if (entity) {
            titleEle.innerHTML = entity.name;
            contentsEle.innerHTML = entity.description;
        }
        else {
            titleEle.innerHTML = "Unknown";
            contentsEle.innerHTML = "Unknown";
        }
        element.classList.remove("cesium-infoBox-bodiless");
        element.classList.add("cesium-infoBox-visible");
    }
    else {
        element.classList.remove("cesium-infoBox-visible");
        element.classList.add("cesium-infoBox-bodiless");
    }
}

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
      infoBox: false
    });    

    // Remove the Terrain section of the baseLayerPicker
    viewer.baseLayerPicker.viewModel.terrainProviderViewModels.removeAll()
    viewer.scene.postProcessStages.fxaa.enabled = true;
    
    const clickhandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    clickhandler.setInputAction(async (movement) => {
        const pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
            if (pick.id instanceof Cesium.Entity) {
                //console.log("Mouse clicked:", pick.id.name);
                ShowInfoBox(!sopInfoBoxIsShowing, pick.id);
            }
            else {
                ShowInfoBox(false, null);
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
    return viewer;
}

function initializePOI(location, viewer) {
    const description = location["description"];
    const imageName = location["image"]
    const audioName = location["audio"]
    const name = location["name"]
    const lat = location["lat"]
    const lon = location["lon"]

    var infoContent = "";
    if (imageName !== undefined) {
        infoContent += `<img src =\"${imageName}\" width="100%"/><br>`;
    }
    if (description !== undefined) {
        infoContent += `<p>${description}</p>`;
    }
    if (audioName !== undefined) {
        infoContent += `<p>Listen:</p><audio controls src="${audioName}"></audio>`
    }

    const pointEntity = viewer.entities.add({
        name: `${name}`,
        id: `${name}` + _sopmaplocationid++,
        description: `${infoContent}`,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 5),
        billboard: {
            image: "assets/pin2.png",
            width: 48,
            height: 48,
            pixelOffset: new Cesium.Cartesian2(0, -24),
        }/*,
        point: {
            pixelSize: 10,
            color: Cesium.Color.BLACK,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
        },
        label: {
            text: "TEST",
            font: "14pt monospace",
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.MIDDLE,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            pixelOffset: new Cesium.Cartesian2(10, 0),
        }*/
    });
    pointEntity.show = false;
    return pointEntity;
}

function guiClick(ep, viewer) { 
    if (_selectedEp === ep) return;

    if (_selectedEp !== null) {
        for (var li = 0; li < _selectedEp["locations"].length; li++) {
            const loc = _selectedEp["locations"][li];
            const poi = loc["poi"];
            var entity = viewer.entities.getById(poi["id"]);
            entity.show = false;
        }
    }
    for (var li = 0; li < ep["locations"].length; li++) {
        const loc = ep["locations"][li];
        const poi = loc["poi"];
        var entity = viewer.entities.getById(poi["id"]);
        entity.show = true;
    }
    _selectedEp = ep;
}

function initializeGUI(data, viewer) {

    const gui = new lil.GUI({title: "Song of Philadelphia", closeFolders: true});
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "10px";
    gui.domElement.style.left = "10px";
    gui.domElement.style.zIndex = "1000";

    for (var i =0; i < data["seasons"].length; i++) {
        const season = data["seasons"][i];
        const num = season["num"];
        var title = season["title"];
        if (title !== undefined) {
            title = 'Season ' + num + ': ' + title;
        }
        else {
            title = 'Season ' + num; 
        }
        const folder = gui.addFolder(title);
        for (var epi = 0; epi < season["episodes"].length; epi++) {
            const ep = season["episodes"][epi];
            const epNum = ep["num"];
            const epTitle = ep["title"];
            const desc = ep["description"];
            const fullTitle = `Episode ${epNum}: ${epTitle}`;

            for (var li = 0; li < ep["locations"].length; li++) {
                const loc = ep["locations"][li];
                const poi = initializePOI(loc, viewer);
                loc["poi"] = poi;
            }

            ep[fullTitle] = function () { guiClick(ep, viewer); };
            folder.add(ep, fullTitle);
        }
    }

    return gui;
}

//Geo 4422/5408 Project: Web Mapping
//Authors: Adam McKee, Mayowa Lasode, Tyler Armstrong
//Date 12.2.18


//Define ArcGIS JavaScript Requirements and their Functions
require([
		"esri/Map","esri/Basemap", "esri/views/MapView","esri/widgets/Home","esri/widgets/Compass","esri/layers/FeatureLayer",
		"esri/widgets/Feature","esri/widgets/Search","esri/widgets/LayerList","esri/widgets/BasemapToggle",	"esri/widgets/Legend",
		"esri/widgets/Expand","esri/widgets/Print","esri/layers/GraphicsLayer","esri/tasks/QueryTask","esri/tasks/support/Query",
		"dojo/_base/array","dojo/dom","dojo/on","dojo/domReady!"
	], 
	function(
		Map,Basemap,MapView,Home,Compass,FeatureLayer,Feature,Search,LayerList,BasemapToggle,Legend,Expand,Print, GraphicsLayer, QueryTask, Query, arrayUtils, dom, on,
	) 	{
		
	//Create Crime Pop-up Template and Content
	var crimeTemplate = { // autocasts as new PopupTemplate()
        title: "Crime Rate in Austin, Texas",
        content: [{
        // It is also possible to set the fieldInfos outside of the content
        // directly in the popupTemplate. If no fieldInfos is specifically set
        // in the content, it defaults to whatever may be set within the popupTemplate.
        type: "fields",
        fieldInfos: [{
          fieldName: "GO_Highest",
          label: "<b>Crime Type</b>",
          visible: true
        }, {
          fieldName: "GO_Locatio",
          label: "<b>Address</b>",
          visible: true,
        }, {
          fieldName: "GO_Report",
          label: "<b>Report Date</b>",
          visible: true,
        }, {
          fieldName: "Clearanc_1",
          label: "<b>Clearance Date</b>",
          visible: true,
        }, {
          fieldName: "GO_Distric",
          label: "<b>District</b>",
          visible: true,
       }]
     }]
    };
    
    //Create Other Variables Pop-up Template and Content	
    var medIncomeTemplate = {	// autocasts as new PopupTemplate()
        title: "Median Household Income in Austin, Texas",
        content: [{
        // It is also possible to set the fieldInfos outside of the content
        // directly in the popupTemplate. If no fieldInfos is specifically set
        // in the content, it defaults to whatever may be set within the popupTemplate.
        type: "fields",
        fieldInfos: [{
          fieldName: "NAME",
          label: "<b>Census Tract</b>",
          visible: true
        }, {
          fieldName: "Med15",
          label: "<b>2015 Median Income ($)</b>",
          visible: true,
          format: {
			  digitSeparator: true, 
			  places: 0
		  }
		 }, {
          fieldName: "MedInc16",
          label: "<b>2016 Median Income ($)</b>",
          visible: true,
          format: {
			  digitSeparator: true, 
			  places: 0
		  }
        }, {
          fieldName: "PrcNoHs15",
          label: "<b>% of Pop. with no High School Diploma in 2015</b>",
          visible: true,
        }, {
          fieldName: "PrcNoHs16",
          label: "<b>% of Pop. with no High School Diploma in 2016</b>",
          visible: true,
        }, {
          fieldName: "PrcNoBach1",
          label: "<b>% of Pop. with no Bachelor's Degree in 2015</b>",
          visible: true,
        }, {
          fieldName: "PrcNoHs16",
          label: "<b>% of Pop. with no Bachelor's Degree in 2016</b>",
          visible: true,
        }, {
          fieldName: "TotHouse15",
          label: "<b>2015 Total Number of Households</b>",
          visible: true,
        }, {
          fieldName: "TotHouse16",
          label: "<b>2016 Total Number of Households</b>",
          visible: true,
       }]
     }]
    };
        
	var myVar;
	
	function myFunc(){
		myvar = setTimeout(showPage);
	}
	
	function showPage() {
		document.getElementById("loader").style.display = "none";
		document.getElementById("myDiv").style.display = "block";
	}
	
  //Adding heatmap renderer variable  	
	var heatmapRenderer = {
  type: "heatmap",
  colorStops: [
    { color: "rgba(63, 40, 102, 0)", ratio: 0 },
    { color: "#472b77", ratio: 0.083 },
    { color: "#4e2d87", ratio: 0.166 },
    { color: "#563098", ratio: 0.249 },
    { color: "#5d32a8", ratio: 0.332 },
    { color: "#6735be", ratio: 0.415 },
    { color: "#7139d4", ratio: 0.498 },
    { color: "#7b3ce9", ratio: 0.581 },
    { color: "#853fff", ratio: 0.664 },
    { color: "#a46fbf", ratio: 0.747 },
    { color: "#c29f80", ratio: 0.830 },
    { color: "#e0cf40", ratio: 0.913 },
    { color: "#ffff00", ratio: 1 }
  ],
  minPixelIntensity: 0,
  maxPixelIntensity: 1000
};
	

	//Adding feature layers from service
	var crimeLayer1 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/1",
		id: "crime2015", 
		title: "2015 Crime Heatmap",
		visible: true,
		renderer: heatmapRenderer,
		view: view,
		popupTemplate: crimeTemplate
	});
	
	var crimeLayer2 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/1",
		id: "crime2015", 
		title: "2015 Crime Data",
		visible: true,
		view: view,
		popupTemplate: crimeTemplate
	});
	
	var crimeLayer4 = new FeatureLayer({ 
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/0",
		id:"crime2016",
		title: "2016 Crime Heatmap",
		visible: false,
		renderer: heatmapRenderer,
		view: view,  
		popupTemplate: crimeTemplate
	}); 
	
	var crimeLayer3 = new FeatureLayer({ 
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/0",
		id:"crime2016",
		title: "2016 Crime Data",
		visible: false,
		view: view,  
		popupTemplate: crimeTemplate
	}); 
	
	var medIncome1 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/4",
		id:"medIncome2015",
		title: "Median Household Income for 2015",
		visible: false,
		view: view,  
		popupTemplate: medIncomeTemplate
	}); 
	
	var medIncome2 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/3",
		id:"medIncome2016",
		title: "Median Household Income for 2016",
		visible: false,
		view: view,  
		popupTemplate: medIncomeTemplate
	});
	
	var popWoHsDegree1 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/6",
		id: "popWoDegree2015",
		title: "Percent Population Over 18 Without High School Diploma 2015",
		visible: false,
		view: view, 
		popupTemplate: medIncomeTemplate
 
	});
	
	var popWoHsDegree2 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/5",
		id:"popWoDegree2016",
		title: "Percent Population Over 18 Without High School Diploma 2016",
		visible: false,
		view: view,  
		popupTemplate: medIncomeTemplate
	});
	
	var popWoBDegree1 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/8",
		id:"popWoBDegree2015",
		title: "Percent Population Over 18 Without Bachelor's Degree 2015",
		visible: false,
		view: view,  
		popupTemplate: medIncomeTemplate		
	});
	
	var popWoBDegree2 = new FeatureLayer({
		url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/7",
		id:"popWoBDegree2016",
		title: "Percent Population Over 18 Without Bachelor's Degree 2016",
		visible: false,
		view: view,  
		popupTemplate: medIncomeTemplate
	});
	

	// Create the Map and add the featureLayer defined above
	var map = new Map({
		basemap: "dark-gray",
		layers: [medIncome1, medIncome2, popWoHsDegree1, popWoHsDegree2, popWoBDegree1, popWoBDegree2, crimeLayer1, crimeLayer2,crimeLayer3,crimeLayer4,]
	});

	// Create the MapView 
	var view = new MapView({
		container: "viewDiv",
		map: map,
		center: [-97.748403, 30.317977],
		zoom: 11
	});  
	
	
     // 1 - Create basemap toggle widget
     var toggle = new BasemapToggle({
     // 2 - Set properties
          view: view, // view that provides access to the map's 'topo' basemap
          nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
        });

     // Add widget to the top right corner of the view
        view.ui.add(toggle, "top-right");
        
     
      
      
	//Adding Pointer-Move Function
	view.when().then(function() {
     // Create a default graphic for when the application starts
        const graphic = {
          popupTemplate: {
            content: "Mouse over features to show details..."
          }
        };

        // Provide graphic to a new instance of a Feature widget
        const feature = new Feature({
          graphic: graphic,
          view: view
        });

        view.ui.add(feature, "top-left");

        view.whenLayerView(crimeLayer2).then(function(layerView) {
          let highlight;
          // listen for the pointer-move event on the View
          view.on("pointer-move", function(event) {
            // Perform a hitTest on the View
            view.hitTest(event).then(function(event) {
              // Make sure graphic has a popupTemplate
              let results = event.results.filter(function(
                result) {
                return result.graphic.layer.popupTemplate;
              });
              let result = results[0];
              highlight && highlight.remove();
              // Update the graphic of the Feature widget
              // on pointer-move with the result
              if (result) {
                feature.graphic = result.graphic;
                highlight = layerView.highlight(result.graphic);
              } else {
                feature.graphic = graphic;
              }
            });
          });
        });

      });
    
    
   //Adding Home button widget 
    var homeBtn = new Home({
        view: view
      });

      // Add the home button to the top left corner of the view
      view.ui.add(homeBtn, "top-left");
      
    //Adding Compass Widget      
      var compassWidget = new Compass({
  view: view
});

// Add the Compass widget to the top left corner of the view
view.ui.add(compassWidget, "top-left");
    
      	
    
    //Adding an interactive search bar widget
    var searchWidget = new Search({
        view: view,
        allPlaceholder: "Crime Location",
        sources: [{
          featureLayer: {
            url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/1",
            popupTemplate: { // autocasts as new PopupTemplate()
              title: "Crime Type: {GO_Highest}</br> Report Date: {GO_Report}</br> Clearance Date: {Clearanc_1} </br> Address: {GO_Locatio} </br> District: {GO_Distric} </br> Census Tract: {GO_Census}",
              overwriteActions: true
            }
          },
          searchFields: ["GO_Locatio"],
          displayField: "GO_Locatio",
          exactMatch: false,
          outFields: ["GO_Locatio", "Highest_NI", "GO_Distric", "GO_Highest", "GO_Report", "Clearanc_1", "GO_Census"],
          name: "Crime Location",
          placeholder: "example: 1301 W RUND",
        }, {
          featureLayer: {
            url: "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/1",
            popupTemplate: { // autocasts as new PopupTemplate()
              title: "Crime Type: {GO_Highest}</br> Report Date: {GO_Report}</br> Clearance Date: {Clearanc_1} </br> Address: {GO_Locatio} </br> District: {GO_Distric} </br> Census Tract: {GO_Census}",
              overwriteActions: true
            }
          },
          searchFields: ["GO_Highest", "GO_Distric"],
          suggestionTemplate: "{GO_Highest}, {GO_Distric}",
          exactMatch: false,
          outFields: ["GO_Locatio", "Highest_NI", "GO_Distric", "GO_Highest", "GO_Report", "Clearanc_1", "GO_Census"],
          placeholder: "example: Theft",
          name: "Crime Type",          
        }]
      });
    
    //Embed Search widget in expand widget  
    var searchExpand = new Expand({
		view: view, 
		content: searchWidget
	}); 

      // Add the search widget to the top left corner of the view
      view.ui.add(searchExpand, {position: "top-right"
      });
      
      //Create a layer list with legend widget
	const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: function(event) {
          const item = event.item;
          if (item.layer.type != "group") { // don't show legend twice
            item.panel = {
              content: "legend",
              open: false,
            };
          }
        }
      });
     
     //Embed Layerlist widget in expand widget   
    var listExpand = new Expand({
		view: view, 
		content: layerList,
		expanded: true
	}); 	
	
	view.ui.add(listExpand, "bottom-right");
	
	 
	//Adding Query function and defining its refernce url
	var popUrl= "https://services9.arcgis.com/HTIYFCNNoTCwwZfk/arcgis/rest/services/AustinCrimeData/FeatureServer/5";
						
						//Defines variable for the pop up window that appears after a query is performed and a city is selected from those results. It displays information from given fields in the layer. 
						var popupTemplate = {
							title: "{NAMELSAD}",
							fieldInfos: [{
								fieldName: "MedInc16",
								label: "Median Income 2016",
								format: {
									places: 0,
									digitSeperator: true
								}
							}, {
								fieldName: "Med15",
								label: "Median Income 2015",
								format: {
									places: 0,
									digitSeperator: true
								}
							}],
							
						//Listing query-reult pop-up content
							content:
								"<br><b>Median Income in 2015:</b> ${Med15} " +
								"<br><b>Median Income in 2016:</b> ${MedInc16} " +								
								"<br><b>Population with No High School Degree in 2015:</b> {PrcNoHs15}%" +
								"<br><b>Population with No High School Degree in 2016:</b> {PrcNoHs16}%"+
								"<br><b>Population with No Bachelors Degree in 2015:</b> {PrcNoBach1}%" +
								"<br><b>Population with No Bachelors Degree in 2016:</b> {PrcNoBac_1}%" +
								"<br><b>Total Households in 2015:</b> {TotHouse15}" +
								"<br><b>Total Households in 2016:</b> {TotHouse16}" 
							
						};
						
						//Defines variable that declares a new GraphicsLayer
						var resultsLayer = new GraphicsLayer();
						
						//Defines variable that declares a new QueryTask operator and references the variable for the url.
						var qTask = new QueryTask ({
							url: popUrl
						});
			
						//Defines variable that declares a new Query operator and defines what will happen when a query is performed. 
						var params = new Query({
							returnGeometry: true,
							outFields: ["*"]
						});
				
			
				
			 	//Defines function to be executed when the query button is pushed. 
				view.when(function() {
					view.ui.add("optionsDiv", "bottom-left");
					on(dom.byId("doBtn"), "click", doQuery);
				});
			
				//Defines variable to get selected attributes 
				var attributeName = dom.byId("attSelect");
				
				var expressionSign = dom.byId("signSelect");
				
				var value = dom.byId("valSelect");
			
				//Defines function that actually runs the query and defines what should be returned when it occurs. 
				function doQuery() {
					resultsLayer.removeAll();
					params.where = attributeName.value + expressionSign.value + value.value;
					qTask.execute(params)
						.then(getResults)
						.catch(promiseRejected);
				}
			
				//Defines function that dictates what happens when results are returned. 
				function getResults(response) {
					
					var popResults = arrayUtils.map(response.features, function(feature) {
						feature.popupTemplate = popupTemplate;
						return feature;
					});
					
					resultsLayer.addMany(popResults);
					
					//Goes to whatever city you selected from your query results. 
					view.goTo(popResults).then(function () {
						view.popup.open({
							features: popResults,
							featureMenuOpen: true,
							updateLocationEnabled: true
						});
					});
					
					dom.byId("printResults").innerHTML = popResults.length + " results found!";
				}
			
				function promiseRejected(error) {
					console.error("Promise rejected: ", error.message);
				}
				
				
	function myFunc () {
		myVar = setTimeout(showPage);
	} 
	
	function showPage () {
		document.getElementById("loader").style.display = "none";
		
	}
  });
 
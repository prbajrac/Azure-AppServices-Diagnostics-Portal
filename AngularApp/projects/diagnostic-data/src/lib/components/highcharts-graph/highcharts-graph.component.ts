import * as momentNs from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { TimeSeriesType } from '../../models/detector';
import * as Highcharts from 'highcharts';
import AccessibilityModule from 'highcharts/modules/accessibility';

AccessibilityModule(Highcharts);

const moment = momentNs;

declare let d3: any;

// Highcharts.setOptions({
//     title: {
//       style: {
//         color: 'tomato'
//       }
//     },
//     legend: {
//       enabled: false
//     }
//   });

@Component({
  selector: 'highcharts-graph',
  templateUrl: './highcharts-graph.component.html',
  styleUrls: ['./highcharts-graph.component.scss']
})
export class HighchartsGraphComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    options: any;
    chartOptions: any;
    chartType: TimeSeriesType;

 //   @Input() chartData: GraphSeries[];
    @Input() HighchartData: any = [];

    // @Input() chartType: TimeSeriesType;

    // @Input() chartOptions: any;

     @Input() startTime: momentNs.Moment;

     @Input() endTime: momentNs.Moment;

    loading: boolean = true;

    constructor() {

    }

    ngOnInit() {
        this._setOptions();
      this._updateOptions();

    console.log("ChartObject", this.Highcharts);
    console.log("Input Data", this.HighchartData);
      console.log("ChartData", this.chartOptions);

      setTimeout(() => {
        this.loading = false;
      }, 100);
    }

    private _updateOptions() {
      if (this.chartType) {
      //  this.options.chart.type = Nvd3Utilities.getChartType(this.chartType);
      }

    //   if (this.chartOptions) {
    //     this._updateObject(this.options.chart, this.chartOptions);
    //   }

      if (this.startTime && this.endTime) {
        this.options.forceX = [this.startTime, this.endTime];
      }
    }

    private _updateObject(obj: Object, replacement: any): Object {
      Object.keys(replacement).forEach(key => {
        const subItem = obj[key];
        const replace = replacement[key];
        // Below returns true if subItem is an object
        if (subItem === Object(subItem)) {
          obj[key] = this._updateObject(subItem, replace);
        } else {
          obj[key] = replace;
        }
      });

      return obj;
    }

    private _setOptions() {


        this.chartOptions = {
          //   legend: {
          //     layout: 'vertical',
          //     backgroundColor: '#FFFFFF',
          //     align: 'left',
          //     verticalAlign: 'middle',
          //     floating: true,
          //     x: 90,
          //     y: 45
          // },
          title: { text: '' },
          chart: {
            height: 200,
            // 'area', 'column'
            type: 'column',
            zoomType: 'x',
            resetZoomButton: {
              position: {
                  // align: 'right', // by default
                  // verticalAlign: 'top', // by default
                  x: 0,
                  y: -20
              }
          }
        },
            legend: {
              enabled: true,
              align: 'center',
              layout: 'horizontal',
              verticalAlign: 'top',
              itemStyle: {"color": "#333", "cursor": "pointer", "fontSize": "12px",  "textOverflow": "ellipsis", "font-weight":"normal", "font-family":" Arial, sans-serif"},
              itemMarginTop: 0,
              itemMarginBottom: 0,
              accessibility: {
                enabled: true,
                keyboardNavigation: {
                  enabled: true
                }
              }
            },
            plotOptions: {
              series: {
                showInLegend: true,
                lineWidth: 1.5,
              }
            },
            xAxis: {
                type: 'datetime',
                axisLabel: 'Time (UTC)',
                tickSize: 10,
                tickFormat: function (d: any) { return moment(d).utc().format('MM/DD HH:mm'); },
                dateTimeLabelFormats: {
                    second: '%m-%d<br/>%H:%M:%S',
                    minute: '%m-%d<br/>%H:%M',
                    hour: '%m-%d<br/>%H:%M',
                    day: '%Y<br/>%m-%d',
                    week: '%Y<br/>%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
          yAxis: {
            axisLabel: '',
            title: {
              text: ''
          },
          endOnTick: false,
            // showMaxMin: false,
            // tickFormat: d3.format('.2f'),
            // axisLabelDistance: -10
          },
            series: this.HighchartData  //as Array<Highcharts.Series>,
          } as Highcharts.Options;

       //   this.chartOptions.series = this.HighchartData as Array<Highcharts.Series>;

    //   this.options = {
    //     chart: {
    //       type: 'lineChart',
    //       height: 200,
    //       margin: {
    //         top: 30,
    //         right: 40,
    //         bottom: 50,
    //         left: 50
    //       },
    //       // color: colors,
    //       useInteractiveGuideline: true,
    //       transitionDuration: 350,
    //       showLegend: true,
    //       stacked: true,
    //       clipEdge: false,
    //       showControls: false,
    //       x: function (d: any) { return moment(d.x).valueOf(); },
    //       y: function (d: any) { return d.y; },
    //       xAxis: {
    //         showMaxMin: false,
    //         axisLabel: 'Time (UTC)',
    //         tickSize: 10,
    //         staggerLabels: false,
    //         tickFormat: function (d: any) { return moment(d).utc().format('MM/DD HH:mm'); }
    //       },
    //       yAxis: {
    //         showMaxMin: false,
    //         tickFormat: d3.format('.2f'),
    //         axisLabel: '',
    //         axisLabelDistance: -10
    //       },
    //       forceY: [0, 1]
    //     }
    //   };
    }

    // Try out highcharts data
    updateDemo2: boolean = false;
    usedIndex: number = 0;
    chartTitle: string = 'My chart'; // for init - change through titleChange

    // change in all places
    titleChange(event: any) {
      var v = event;
      this.chartTitle = v;

      this.charts.forEach((el) => {
        el.hcOptions.title.text = v;
      });

      // trigger ngOnChanges
      this.updateDemo2 = true;
    };

    charts = [{
        hcOptions: {
        plotOptions: {
          series: {
             pointStart: Date.now(),
             pointInterval: 86400000 // 1 day
          }
        },
        series: [{
          type: 'line',
          data: [11, 2, 3],
          threshold: 5,
          negativeColor: 'red',
          events: {
            dblclick: function () {
              console.log('dblclick - thanks to the Custom Events plugin');
            }
          }
        }, {
          type: 'candlestick',

          data: [
            [0, 15, -6, 7],
            [7, 12, -1, 3],
            [3, 10, -3, 3]
          ]
        }]
      } as Highcharts.Options,
        hcCallback: (chart: Highcharts.Chart) => {
        console.log('some variables: ', Highcharts, chart, this.charts);
      }
    }];

  }

  export interface GraphPoint {
    x: momentNs.Moment;
    y: number;
  }

  export interface GraphSeries {
    key: string;
    values: GraphPoint[];
  }

  export interface HighchartsData {
        x: momentNs.Moment;
        y: number;
        name: string;
        color: string;
  }

  export interface HighchartGraphSeries {
    name: string;
    type: string;
    data: any;
    events: Function;
  }

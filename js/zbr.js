let clock = new Vue({
    el: '#zbrApp',
    data: {
        actvie: 'actvie',
        // top 
        chartPeopleNumber: '',
       
        curPeopleNumber: 5,
        allNum: {
            name: '实时总人数',
            number: 0,
        },
        spread: [
            {
                id: 'venueIn',
                name: '今日馆内人数',
                Num: 0,
                Ratio: '0%',
                Yesterday: "-0"
            }, {
                id: 'venueOut',
                name: '今日馆外人数',
                Num: 0,
                Ratio: '0%',
                Yesterday: "-0"
            }, {
                id: 'churchyard',
                name: '今日境内人数',
                Num: 0,
                Ratio: '0%',
                Yesterday: "-0"
            }, {
                id: 'overseas',
                name: '今日境外人数',
                Num: 0,
                Ratio: '0%',
                Yesterday: "-0"
            },
        ],
        charTerminal: '',
        // center 
        curPeopleSpread: 1,// 地图/列表
        mapPeopleSpread: '',
        mapOptionFrom: '', // 出发地配置
        imgFrom:'',
        imgTo:'',
        mapOptionTo: '', // 目的地配置
        mapOptionLine: '',//线条动画配置
        curPeopleSpradTable: [],
        geoCoordMap: '', // 坐标信息
        curMapArea:'china',
        curMapTableArea:'china',
        // bottom
        man: {
            number: "60%",
            name: "男性"
        },
        woman: {
            number: "40%",
            name: "男性"
        }
    },
    mounted () {
        this.init();
        this.show_num1(934610);
    },
    methods: {
        show_num1:function(n){
            var it = $(".t_num1 i");
            var len = String(n).length;
            for(var i = 0; i < len; i++) {
                if(it.length <= i) {
                    $(".t_num1").append("<i></i>");
                }
                var num = String(n).charAt(i);
                //根据数字图片的高度设置相应的值
                var y = -parseInt(num) * 126;
                var obj = $(".t_num1 i").eq(i);
               obj.animate({
                    backgroundPosition: '(-268px ' + String(y) + 'px)'
                }, 'slow', 'swing', function() {});
            }
        },
        init () {
            // 初始化组件
            // 地图背景图请求
            this.imgFrom = $('.areaFrom img')
            this.imgTo = new Image();
            this.imgTo.src = '../img/area-to-bg.png';
            this.$nextTick(function () {
                this.initChartPeopleNumber();
                this.initChartPeopleTerminal();
                this.initMap();
                // 数据获取
                this.axiosPeopleNumber();
                this.axiosPeopleNumberByTime({ TIME: 5 });
                this.axiosPeopleTerminal();
                this.changSpreadMap(this.curMapArea);
                this.changSpreadMapTable(this.curMapTableArea);
            })
        },
        /**
         * @description 人数曲线图 切换五分钟/十分钟
         */
        changCurPeopleNumber (data) {
            // tab 效果
            this.curPeopleNumber = data;
            // 数据切换
            this.axiosPeopleNumberByTime({ TIME: data });
        },
        /**
        * @description 人数分布地图 切换地图/列表
        */
        changCurPeopleSpread (data) {
            this.curPeopleSpread = data;
        },
        /**
         * @description 人数直方折线图
         */
        initChartPeopleNumber () {
            this.chartPeopleNumber = echarts.init(document.getElementById('peopleNumber'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 23,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['今日人数', '昨日人数']
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        // name: '',
                        // max: 30,
                        // min: 0,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        // max: 1200,
                        // min: 0,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '今日人数',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4457a4'
                        },
                        data: []
                    },
                    {
                        name: '昨日人数',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPeopleNumber.setOption(option);
        },
        /**
         * @description 终端型号图
         */
        initChartPeopleTerminal () {
            this.charTerminal = echarts.init(document.getElementById('terminal'));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data: []
                },
                radar: {
                    // shape: 'circle',
                    // name: {
                    //     textStyle: {
                    //         color: '#1f87c6',
                    //         // backgroundColor: '#999',
                    //         borderRadius: 3,
                    //         padding: [3, 5]
                    //     }
                    // },
                    splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                        lineStyle: {
                            color: '#0c4188',
                        }
                    },
                    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                        show: true,
                        areaStyle: { // 分隔区域的样式设置。
                            color: ['#054685'],
                            opacity:0.2
                            // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0c4188'
                        }
                    },
                    indicator: [{
                        name: 'null', max: 100,
                        name: 'null', max: 100,
                        name: 'null', max: 100,
                        name: 'null', max: 100,
                        name: 'null', max: 100
                    }]
                },
                series: [{
                    name: '',
                    type: 'radar',
                    lineStyle: {
                        color: 'transparent'
                    },
<<<<<<< Updated upstream
                    textStyle: { // 图例项的文本样式。
                        color:"#1f88c5",
                        fontWeight: '700' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                    },
                    itemStyle: { // 折线拐点标志的样式。
                        normal: { // 普通状态时的样式
                            lineStyle: {
                                width: 0
                            },
                            opacity: 0.2
                        },
                    },
                    areaStyle: {
                        opacity: 0.7,
=======
                    areaStyle:{
>>>>>>> Stashed changes
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#007591' // 0% 处的颜色
                            }, {
<<<<<<< Updated upstream
                                offset: 1, color: '#043e90' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
=======
                                offset: 0.5, color: '#004e82' // 100% 处的颜色
                            },{
                                offset: 1, color: '#043e90' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
>>>>>>> Stashed changes
                    },
                    
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [0, 0, 0],
                            name: '',
                            symbol:'none'
                        },
                    ]
                }]
            };
            this.charTerminal.setOption(option);
        },
        /**
        * @description 地图-echart
        */
        initMap () {
            //  背景图 
            
            // 基于准备好的dom，初始化echarts实例
            this.mapPeopleSpread = echarts.init(document.getElementById('map'));
            // 线条动画
            let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            let series = [];
            // 用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
            // 线条配置
            this.mapOptionLines = {
                //出发地信息
                name: '',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 9
                },
                lineStyle: {
                    normal: {
                        color: function (params) {
                            return '#01a3ae'
                        },
                        width: 1.5,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },

                data: []
                /*  {
                *   fromName: "安徽" // 出发地
                *   toName: "山东" // 目的地
                *   numValue: 5 // 数值
                *   coords: [ // 坐标
                *      [117.283042, 31.26119]
                *      [118.000923, 36.275807]
                *    ]
                *    }
               */
            }
                //目的地
            this.mapOptionTo = {
                // 目的地信息 
                name: '',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 4,
                // emphasis: {
                //     label: {
                //         show: true,
                //         formatter: function (param) {
                //             return param.data[3];
                //         },
                //         position: 'top'
                //     }
                // },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    // color: new echarts.graphic.RadialGradient(0.1, 0.3, 1, [{
                    //     offset: 0,
                    //     color: '#8af2e2'
                    // }, {
                    //     offset: 1,
                    //     color: '#8af2e2'
                    // }]),
                    color:'#a9c09a',
                    // color: {
                    //     image: this.imgFrom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    //     repeat: 'repeat'
                    // },
                    formatter: '{b}',
                },
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{@value}',
                    }
                },
                symbolSize: 50,
                data: []
                /**
                 * 获取方法
                 * value： geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                 * 
                 * 数据格式
                 * [{
                 * name:''
                 * value:''
                 * }]
                 */
            }
            // 出发地自身绘制
            this.mapOptionFrom = {
                name: '',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 3,
                // emphasis: {
                //     label: {
                //         show: true,
                //         formatter: function (param) {
                //             return param.data[3];
                //         },
                //         position: 'top'
                //     }
                // },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    //     offset: 0,
                    //     color: '#067691'
                    // }, {
                    //     offset: 0.8,
                    //     color: '#00ffff'
                    // }, {
                    //     offset: 1,
                    //     color: '#00ffff'
                    // }]),
                    color:'#8af2e2',
                    // color: {
                    //     image: imgTo, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    //     repeat: 'repeat'
                    // },
                    formatter: '{b}',
                },
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{@value}',
                    }
                },
                symbolSize: 50,
                data: []
            };
            // 指定地图相关的配置项和数据
            let mapBoxOption = {
                // 地图悬浮tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.data.value) {
                            let res = "<span>城市：</span><span style='color:#fff;padding-right:5px;'>" + params.name +
                                "</span> <br /><span>数量：</sapn><span style='padding-right:5px;'>" + params.value[2] + '</span>';
                            return res;
                        } else {
                            let res = "<span>城市：</span><span style='color:#fff;padding-right:5px;'>" + params.data.toName +
                                "</span> <br /><span>数量：</sapn><span style='padding-right:5px;'>" + params.data.numValue + '</span>';
                            return res;
                        }

                    }
                },

                // 地理坐标系组件
                geo: {
                    map: 'world', // 地图类型
                    roam: true, // 是否开启鼠标缩放和平移漫游
                    aspectScpale: 0.75,
                    center: [116.405285, 39.904989],
                    zoom: 1,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#0864de'
                            }
                        },
                        emphasis: { // 对应的鼠标悬浮效果
                            show: false,
                            textStyle: {
                                color: "#0864de"
                            }
                        }
                    },
                    // 区域填充颜色
                    itemStyle: {
                        normal: { // 正常
                            areaColor: '#021835', // 区域颜色
                            borderColor: '#0864de'// 区域边框
                        },
                        emphasis: { // hover
                            borderWidth: 0,
                            borderColor: '#0066ba',
                            areaColor: "#0494e1",
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                },
                series: series
            };
            // 使用制定的配置项和数据显示图表
            this.mapPeopleSpread.setOption(mapBoxOption);
            // echart图表自适应
            window.addEventListener("resize", function () {
                this.mapPeopleSpread.resize();
            });

        },
        /**
         * @description 地图数据切换
         */
        changSpreadMap (area) {
            this.curMapArea = area;
            if (area === 'world') {
                let data = worldData;
                this.mapPeopleSpread.setOption({
                    geo: {
                        // map: 'china' | '四川'
                        // 必须要先引入了对应地图的js文件或者json文件，在这一步的时候，echarts会自动将对应的JS文件注入，地图才会显示.
                        map: 'world',
                        center: [116.405285, 39.904989],
                    },
                    series: this.getMapSeries(area, data),
                })
            } else if (area === "china") {
                let data = chinaData;
                this.mapPeopleSpread.setOption({
                    geo: {
                        map: 'china',
                        center: [108.948024,34.263161],
                    },
                    series: this.getMapSeries(area, data),
                })

            } else if (area === 'province') {
                let data = beijingData;
                this.mapPeopleSpread.setOption({
                    geo: {
                        map: '北京',
                        center: [116.418757, 39.917544],
                    },
                    series: this.getMapSeries('北京', data),
                })
            }
        },
         /**
         * @description 地图表格数据切换
         */
        changSpreadMapTable (area) {
            this.curMapTableArea = area;
            if (area === 'world') {
                let data= this.cloneArr(worldData1)
                this.curPeopleSpradTable = this.getTotal(data);
            } else if (area === "china") {
                let data= this.cloneArr(chinaData1)
                this.curPeopleSpradTable = this.getTotal(data);
            } else if (area === 'province') {
                let data= this.cloneArr(beijingData1)
                this.curPeopleSpradTable = this.getTotal(data);
            }
        },
        cloneArr(array){
            let arr = [];
            array.filter(function (item) {
                arr.push(Object.assign({},item))
                return item;
            })
            return arr
        },
         /**
         * @description 获取总数
         */
        getTotal(array){
            let num = 0;
            let arr = [];
            array.map(function name(item) {
                num += item.value
            })
            arr = array.map(function name(item) {
                item.value = (item.value/num).toFixed(2)
                item.pro = (item.value * 100) + '%'
                return item;
            })
            return arr;
        },
        /**
         * 获取数据-顶部总人数和各类别人数 
         */
        axiosPeopleNumber (params) {
            // axios.post('/app/queryAllPeopleNumber', params)
            //   .then(function (response) {
            //     let res = response.data 
            //     this.allNum.number = res.allNum;
            //     this.spread.filter(function name(value) {
            //         value = Object.assign(value,res[value.id])
            //     })
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            let res = AllPeopleNumber.data
            this.allNum.number = res.allNum;
            this.spread.filter(function name (value) {
                value = Object.assign(value, res[value.id])
            })
        },
        /**
         * 获取数据-人数曲线图
         */
        axiosPeopleNumberByTime (params) {
            // axios.post('/app/queryPeopleNumberByTime', params)
            //   .then(function (response) {
            //         let res = response.data 
            //         let Today = {
            //             x:this.getPeopleNumberXYData(res.Today).x,
            //             y:this.getPeopleNumberXYData(res.Today).y
            //         } 
            //         let Yesterday= {
            //             x:this.getPeopleNumberXYData(res.Yesterday).x,
            //             y:this.getPeopleNumberXYData(res.Yesterday).y
            //         } 
            //         this.chartPeopleNumber.setOption({
            //             xAxis: [
            //                 {
            //                     data: Today.x
            //                 }
            //             ],
            //             series:[{
            //                 data:Today.y
            //             },{
            //                 data:Yesterday.y
            //             }]
            //         })
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            let PeopleNumberByTime = params.TIME === 5 ? PeopleNumberByTime1 : PeopleNumberByTime2;
            let res = PeopleNumberByTime.data
            console.log(PeopleNumberByTime)
            let Today = {
                x: this.getPeopleNumberXYData(res.Today).x,
                y: this.getPeopleNumberXYData(res.Today).y
            }
            let Yesterday = {
                x: this.getPeopleNumberXYData(res.Yesterday).x,
                y: this.getPeopleNumberXYData(res.Yesterday).y
            }
            console.log(Today,Yesterday)
            this.chartPeopleNumber.setOption({
                xAxis: [
                    {
                        data: Today.x
                    }
                ],
                series: [{
                    data: Today.y
                }, {
                    data: Yesterday.y
                }]
            })
        },
        /**
         * 数据处理-人数曲线图-获取x y 数据
         */
        getPeopleNumberXYData (array) {
            let x = []
            let y = [];
            array.filter(function (value) {
                x.push(value.Time)
                y.push(value.Num)
            })
            return {
                x: x,
                y: y
            }
        },
        /**
         * 获取数据-终端型号图
         */
        axiosPeopleTerminal (params) {
            // axios.post('/app/queryPeopleModelType', params)
            //   .then(function (response) {
            //     let res = response.data 
            //     let indicator = this.handleCharTerminalData(res).indicator;
            //     let seriesData = this.handleCharTerminalData(res).seriesData;
            //     this.charTerminal.setOption({
            //         radar: {
            //             indicator:indicator
            //         },
            //         series: [{
            //             data: [
            //                 {
            //                     value:seriesData,
            //                     name: ''
            //                 }
            //             ]
            //         }]
            //     })
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            let res = PeopleModelType.data
            let indicator = this.handleTerminalData(res).indicator;
            let seriesData = this.handleTerminalData(res).seriesData;
            this.charTerminal.setOption({
                radar: {
                    indicator: indicator
                },
                series: [{
                    data: [
                        {
                            value: seriesData,
                            name: ''
                        }
                    ]
                }]
            })
        },
        /**
         * 获取数据-地图
         */
        axiosMap (params) {
            // axios.post('/app/queryPeopleModelType', params)
            //   .then(function (response) {
            //     let res = response.data 
            //     let indicator = this.handleCharTerminalData(res).indicator;
            //     let seriesData = this.handleCharTerminalData(res).seriesData;
            //     this.charTerminal.setOption({
            //         radar: {
            //             indicator:indicator
            //         },
            //         series: [{
            //             data: [
            //                 {
            //                     value:seriesData,
            //                     name: ''
            //                 }
            //             ]
            //         }]
            //     })
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });

        },
        /**
         * 数据处理-终端型号图--获取radar-indicator 即雷达图每个类别限制最大数 以及 展示数据seriesData
         */
        handleTerminalData (array) {
            let num = [];
            let max = 0;
            let indicator = [];
            let seriesData = []
            // 获取最大值
            array.filter(function (value) {
                num.push(value.Num)
            })
            max = Math.max.apply(null, num);
            // 获取数据
            array.filter(function (value) {
                let obj = {
                    name: value.Name,
                    max: max
                }
                seriesData.push(value.Num)
                indicator.push(obj)
            })
            return {
                seriesData: seriesData,
                indicator: indicator,
            };
        },
        /**
        * 数据处理-地图数据
        * 数据格式:
        *  {
        *  fromName: "安徽" // 出发地
           toName: "山东" // 目的地
           numValue: 5 // 数值
           coords: [ // 坐标
               [117.283042, 31.26119]
               [118.000923, 36.275807]
           ]
        * }
        */
        convertMapData (area, data) {
            let res = [];
            let geoCoordMap = this.getMapFeatures(area);
            for (let i = 0; i < data.length; i++) {
                let dataItem = data[i];
                let fromCoord = geoCoordMap[dataItem[0].name];
                let toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        numValue: dataItem[1].value,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        },
        /**
        * 数据处理-地图数据-获取坐标点 名称+坐标
        * 数据格式:
        * {
        *  台湾:[121.509062, 24.044332]
        *  河北:[114.502461, 38.045474]
        *  }
        */
        getMapFeatures (area) {
            let mapFeatures = echarts.getMap(area).geoJson.features;
            let geoCoordMap = {};
            mapFeatures.forEach(function (v) {
                // 地区名称
                let name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });
            return geoCoordMap;
        },
        /**
       * 数据处理-地图数据-获取Series
       */
        getMapSeries (area, data) {
            let convertMapData = this.convertMapData(area, data);
            let geoCoordMap = this.getMapFeatures(area);
            mapOptionLines = Object.assign(this.mapOptionLines, {
                name: data[0].name,
                data: convertMapData
            })
            mapOptionFrom = Object.assign(this.mapOptionFrom, {
                name: data[0].name,
                data: data.map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                })
            })
            mapOptionTo = Object.assign(this.mapOptionTo, {
                name: data[0].name,
                data: data.map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            })
            // mapOptionFrom = Object.assign(this.mapOptionFrom,{
            //     name:data[0].name,
            //     data: data.map(function (dataItem) {
            //         return {
            //             name: dataItem[0].name,
            //             value: geoCoordMap[dataItem[0].name]
            //         };
            //     })
            // })
            return [mapOptionLines, mapOptionFrom, , mapOptionTo]
        },
    }
});
let zblVue = new Vue({
    el: "#zblApp",
    data: {
        nowDate: '',
        nowTime: '',
        nowWeek: '',
        allNum: {
            name: '实时总人数',
            number: 0,
        },
        spread: [
            {
                id: 'venueIn',
                name: '小区总数',
                Num: 0,
                class: 'main-info-icon-communities',
            }, {
                id: 'venueOut',
                name: '故障告警总数',
                Num: 0,
                class: 'main-info-icon-alarm',

            }, {
                id: 'churchyard',
                name: '性能预警数',
                Num: 0,
                class: 'main-info-icon-communities1',
            }, {
                id: 'overseas',
                name: '工单总数',
                Num: 0,
                class: 'main-info-icon-communities2',
            }, {
                id: 'venueIn',
                name: '到岗人员数',
                Num: 0,
                class: 'main-info-icon-communities3',
            }
        ],
        // 4g
        chartSX: '',
        chartPRC: '',
        chartWX: '',
        chartPRB: '',
        chartPIE1: '',
        chartPIE2: '',
        chartPIE3: '',
        chartPIE4: '',
        chartPIE5: '',
        chartPIE6: '',

        // 5g
        chart5G: '',
        chartTB: '',
        chartPRC2: '',
        chartPUPD: '',
        chartWXQHSX: '',
        chartPRB2: '',

        //数据感知
        chartHTTP: '',
        chartT: '',
        chartB: '',
        chartKPBS: '',
        chartTCP: '',
        chartTCP2: '',
        
        //语音感知

        isShowSelect: false,
        isShowSelectBottom: false,
        // tabs 
        curTabsName: '1',
    },
    mounted () {
        setInterval(() => {
            this.setNowTimes();
        }, 1000);
        this.init();
    },
    methods: {
        init () {
            this.show_num1(9785676, '#total-text');
            this.show_num1(34678, '#total0');
            this.show_num1(872970, '#total1');
            this.show_num1(169690, '#total2');
            this.show_num1(27234, '#total3');
            // 4g图表
            this.initChartSX();
            this.axiosChartSX();
            this.initChartPRC();
            this.axiosChartPRC();
            this.initChartWX();
            this.axiosChartWX();
            this.initChartPRB();
            this.axiosChartPRB();
            this.initChartPIE();
            this.axiosChartPIE();
            // 5g
            this.initChart5G();
            this.axiosChart5G();
            this.initChartTB();
            this.axiosChartTB();
            this.initChartPRC2();
            this.axiosChartPRC2();
            this.initChartPUPD();
            this.axiosChartPUPD();
            this.initChartWXQHSX();
            this.axiosChartWXQHSX();
            this.initChartPRB2();
            this.axiosChartPRB2();
            
            // 数据感知 

            this.initChartHTTP();
            this.axiosChartHTTP();
            this.initChartT();
            this.axiosChartT();
            this.initChartB();
            this.axiosChartB();
            this.initChartKPBS();
            this.axiosChartKPBS();
            this.initChartTCP();
            this.axiosChartTCP();
            this.initChartTCP2();
            this.axiosChartTCP2();

             // 数据感知 

             this.initChartAV();
             this.axiosChartAV();
             this.initChartAV1();
             this.axiosChartAV1();
             this.initChartSRVCC();
             this.axiosChartSRVCC();
             this.initChartLOSS();
             this.axiosChartLOSS();

        },
        tabsChange (name) {
            this.curTabsName = name
        },
        setNowTimes () {
            let myDate = new Date()
            // console.log(myDate)
            let wk = myDate.getDay()
            let yy = String(myDate.getFullYear())
            let mm = myDate.getMonth() + 1
            let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
            let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
            let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
            let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
            let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            let week = weeks[wk]
            this.nowDate = yy + '-' + mm + '-' + dd
            this.nowTime = hou + ':' + min
            this.nowWeek = week
        },
        show_num1: function (n, ele) {
            var it = $(ele + " .t_num1 i");
            var len = String(n).length;
            for (var i = 0; i < len; i++) {
                if (it.length <= i) {
                    $(ele + " .t_num1").append("<i></i>");
                }
                var num = String(n).charAt(i);
                //根据数字图片的高度设置相应的值
                var y = parseInt(num) ? -(56 + (parseInt(num) - 1) * 81.7) : "-793";
                var obj = $(ele + " .t_num1 i").eq(i);
                obj.animate({
                    backgroundPosition: '(-148px ' + String(y) + 'px)'
                }, 'slow', 'swing', function () { });
            }
        },
        /**
         * @description 初始化-4G性能-上下行流量+无线利用率
         */
        initChartSX () {
            this.chartSX = echarts.init(document.getElementById('chartSX'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行', '下行', '无线利用率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'bar',
                        itemStyle: { // 柱条
                            color: '#3b97cc'
                        },
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'bar',
                        itemStyle: { // 柱条
                            color: '#0076e3'
                        },
                        data: []
                    },
                    {
                        name: '无线利用率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartSX.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-上下行流量+无线利用率
        */
        axiosChartSX (params) {
            this.chartSX.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-4G性能-PRC连接数+峰值用户数+无线接通率
         */
        initChartPRC () {
            this.chartPRC = echarts.init(document.getElementById('chartPRC'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['RC连接数', '峰值用户数', '无限连通率']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: 'RC连接数',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4896ee'
                        },
                        data: []
                    },
                    {
                        name: '峰值用户数',
                        type: 'bar',
                        itemStyle: { // 折线拐点
                            color: '#189896'
                        },
                        lineStyle: {// 折线
                            color: '#189896'
                        },
                        data: []
                    },
                    {
                        name: '无限连通率',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
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
            this.chartPRC.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-PRC连接数+峰值用户数+无线接通率
        */
        axiosChartPRC (params) {
            this.chartPRC.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-4G性能-无线掉线率+切换成功率+上行干扰电平
         */
        initChartWX () {
            this.chartWX = echarts.init(document.getElementById('chartWX'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['无线掉线率', '切换成功率', '上行干扰电平']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    },
                ],
                series: [
                    {
                        name: '无线掉线率',
                        type: 'line',
                        // xAxisIndex: 1, // 对应坐标轴
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#aefbbe'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2',
                            type: "dotted"
                        },
                        data: []
                    },
                    {
                        name: '切换成功率',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238aaf' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },
                    {
                        name: '上行干扰电平',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238b8f' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
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
            this.chartWX.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-无线掉线率+切换成功率+ 上行干扰电平
        */
        axiosChartWX (params) {
            this.chartWX.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData1
                }, {
                    data: chartData2
                }, {
                    data: chartData3
                }]
            })
        },
        /**
         * @description 初始化-4G性能-PRB上下行利用率
         */
        initChartPRB () {
            this.chartPRB = echarts.init(document.getElementById('chartPRB'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行', '下行']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        // xAxisIndex: 1, // 对应坐标轴
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0c324f' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4457a4'
                        },
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                // x: 0,
                                // y: 0,
                                // x2: 0,
                                // y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0a4051' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
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
            this.chartPRB.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-PRB上下行利用率
        */
        axiosChartPRB (params) {
            this.chartPRB.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData1
                }, {
                    data: chartData2
                }]
            })
        },
        /**
         * @description 饼图
         */
        initChartPIE () {
            this.chartPIE1 = echarts.init(document.getElementById('chartPIE1'));
            this.chartPIE2 = echarts.init(document.getElementById('chartPIE2'));
            this.chartPIE3 = echarts.init(document.getElementById('chartPIE3'));
            this.chartPIE4 = echarts.init(document.getElementById('chartPIE4'));
            this.chartPIE5 = echarts.init(document.getElementById('chartPIE5'));
            this.chartPIE6 = echarts.init(document.getElementById('chartPIE6'));
            let option = {
                tooltip: null,
                animation: false,
                legend: null,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['70%', '88%'],
                        avoidLabelOverlap: false,
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: 40.21,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: 59.79,
                                name: '底色'
                            },
                        ]
                    }
                ]
            };
            this.chartPIE1.setOption(option);
            this.chartPIE2.setOption(option);
            this.chartPIE3.setOption(option);
            this.chartPIE4.setOption(option);
            this.chartPIE5.setOption(option);
            this.chartPIE6.setOption(option);
        },
        /**
        * 获取数据-饼图组
        */
        axiosChartPIE (params) {
            this.chartPIE1.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie1,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie2,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPIE2.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie3,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie4,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPIE3.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie1,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie2,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPIE4.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie1,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie2,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPIE5.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie1,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie2,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPIE6.setOption({
                series: [
                    {
                        data: [
                            {
                                itemStyle: {
                                    color: '#0079b7',
                                },
                                selected: false,
                                label: {
                                    position: 'center',
                                    formatter: '{d}%',
                                    color: "#fff",
                                    fontSize: 28,
                                },
                                value: pie1,
                                name: '底色'
                            },
                            {
                                markPoint: {
                                    itemStyle: {
                                        color: '#0079b7',
                                        barBorderRadius: 23,
                                    },
                                },
                                itemStyle: {
                                    color: '#01283d',
                                    borderColor: "#0079b7",
                                    borderWidth: 1,
                                },
                                value: pie2,
                                name: '底色'
                            },
                        ]
                    }
                ]
            });
            this.chartPRB.setOption({
                // xAxis: [
                //     {
                //         data: chartData
                //     }
                // ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * 右侧筛选栏点击select弹出公共事件
         */
        controlSelct () {
            this.isShowSelect = !this.isShowSelect;
        },
        /**
         * 点击其他区域select收起公共事件
         */
        controlSelctBottom () {
            this.isShowSelectBottom = !this.isShowSelectBottom;
        },
         /**
         * @description 初始化-5g性能-5g用户量
         */
        initChart5G () {
            this.chart5G = echarts.init(document.getElementById('chart5G'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['5G用户量']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '5G用户量',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0e6976'
                        },
                        data: []
                    }
                ]
            };
            this.chart5G.setOption(option);
        },
         /**
         * @description 获取数据-5g性能-5g用户量
         */
        axiosChart5G (params) {
            this.chart5G.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData4
                }]
            })
        },
        /**
         * @description 初始化-5g性能-上下行流量+无线利用率
         */
        initChartTB () {
            this.chartTB = echarts.init(document.getElementById('chartTB'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行', '下行', '无线利用率']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#3b97cc'
                        },
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0076e3'
                        },
                        data: []
                    },
                    {
                        name: '无线利用率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartTB.setOption(option);
        },
        /**
         * @description 初始化-获取数据-上下行流量+无线利用率
         */
        axiosChartTB (params) {
            this.chartTB.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-5g性能-PRC连接数+峰值用户数+无线接通率
         */
        initChartPRC2 () {
            this.chartPRC2 = echarts.init(document.getElementById('chartPRC2'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['PRC连接数', '峰值用户数', '无线接通率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: 'PRC连接数',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4896ee'
                        },
                        data: []
                    },
                    {
                        name: '峰值用户数',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#189896'
                        },
                        data: []
                    },
                    {
                        name: '无线接通率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPRC2.setOption(option);
        },
        /**
         * @description 获取数据-5g性能-PRC连接数+峰值用户数+无线接通率
         */
        axiosChartPRC2 (params) {
            this.chartPRC2.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-5g性能-上下PUSCH行流量+下行PDCCH利用率
         */
        initChartPUPD () {
            this.chartPUPD = echarts.init(document.getElementById('chartPUPD'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上下PUSCH行流量', '下行PDCCH利用率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上下PUSCH行流量',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#134b76'
                        },
                        lineStyle: { // 柱条
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#134b76' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#134b76' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol:"circle",
                        data: []
                    },
                    {
                        name: '下行PDCCH利用率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPUPD.setOption(option);
        },
        /**
         * @description 获取数据-5g性能-上下PUSCH行流量+下行PDCCH利用率
         */
        axiosChartPUPD (params) {
            this.chartPUPD.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData10
                }, {
                    data: chartData11
                }]
            })
        },
        /**
         * @description 初始化-5g性能-无线掉线率+切换成功率+上行干扰电平
         */
        initChartWXQHSX () {
            this.chartWXQHSX = echarts.init(document.getElementById('chartWXQHSX'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['无线掉线率', '切换成功率', '上行干扰电平']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '无线掉线率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#20868d'
                        },
                        lineStyle:{
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#20868d' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#20868d' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",
                        data: []
                    },
                    {
                        name: '切换成功率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#145f85'
                        },
                        lineStyle:{
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#145f85' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#145f85' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",
                        data: []
                    },
                    {
                        name: '上行干扰电平',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                       
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartWXQHSX.setOption(option);
        },
        /**
         * @description 获取数据-5g性能-无线掉线率+切换成功率+上行干扰电平
         */
        axiosChartWXQHSX (params) {
            this.chartWXQHSX.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData9
                }, {
                    data: chartData1
                }, {
                    data: chartData7
                }]
            })
        },
         /**
         * @description 初始化-5g性能-上行+下行
         */
        initChartPRB2 () {
            this.chartPRB2 = echarts.init(document.getElementById('chartPRB2'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行', '下行']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#248bb1'
                        },
                        itemStyle:{
                            color: '#248bb1'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#248bb1' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#248bb1' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#21568c'
                        },
                        itemStyle:{
                            color: '#21568c'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#21568c' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#21568c' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPRB2.setOption(option);
        },
         /**
         * @description 初始化-5g性能-上行+下行
         */
        axiosChartPRB2 (params) {
            this.chartPRB2.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData5
                }, {
                    data: chartData12
                }]
            })
        },
         /**
         * @description 初始化-数据感知-HTTP业务成功率+HTTP平均响应延迟
         */
        initChartHTTP () {
            this.chartHTTP = echarts.init(document.getElementById('chartHTTP'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['HTTP业务成功率','HTTP平均响应延迟']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: 'HTTP业务成功率',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0e6976'
                        },
                        data: []
                    },
                    {
                        name: 'HTTP平均响应延迟',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0e6976'
                        },
                        data: []
                    }
                ]
            };
            this.chartHTTP.setOption(option);
        },
         /**
         * @description 获取数据-数据感知-HTTP业务成功率+HTTP平均响应延迟
         */
        axiosChartHTTP (params) {
            this.chartHTTP.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData4
                }]
            })
        },
        /**
         * @description 初始化-数据感知-上行
         */
        initChartT () {
            this.chartT = echarts.init(document.getElementById('chartT'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
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
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartT.setOption(option);
        },
        /**
         * @description 初始化-获取数据-上行
         */
        axiosChartT (params) {
            this.chartT.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-数据感知-下行
         */
        initChartB () {
            this.chartB = echarts.init(document.getElementById('chartB'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['下行']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '下行',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartB.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-PRC连接数+峰值用户数+无线接通率
         */
        axiosChartB (params) {
            this.chartB.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-数据感知-下行速率+下行速率(>500k)
         */
        initChartKPBS () {
            this.chartKPBS = echarts.init(document.getElementById('chartKPBS'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['下行速率', '下行速率(>500k)']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '下行速率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#134b76'
                        },
                        lineStyle: { // 柱条
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#134b76' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#134b76' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol:"circle",
                        data: []
                    },
                    {
                        name: '下行速率(>500k)',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartKPBS.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-上下PUSCH行流量+下行PDCCH利用率
         */
        axiosChartKPBS (params) {
            this.chartKPBS.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData10
                }, {
                    data: chartData11
                }]
            })
        },
        /**
         * @description 初始化-数据感知-TCP建立成功率+TCP建立平均延时
         */
        initChartTCP () {
            this.chartTCP = echarts.init(document.getElementById('chartTCP'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['TCP建立成功率', 'TCP建立平均延时']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: 'TCP建立成功率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#20868d'
                        },
                        lineStyle:{
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#20868d' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#20868d' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",
                        data: []
                    },
                    {
                        name: 'TCP建立平均延时',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                       
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartTCP.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-TCP建立成功率+TCP建立平均延时
         */
        axiosChartTCP (params) {
            this.chartTCP.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData9
                }, {
                    data: chartData1
                }]
            })
        },
         /**
         * @description 初始化-数据感知-TCP建立时延无线侧+TCP建立时延核心侧
         */
        initChartTCP2 () {
            this.chartTCP2 = echarts.init(document.getElementById('chartTCP2'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['TCP建立时延无线侧', 'TCP建立时延核心侧']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#248bb1'
                        },
                        itemStyle:{
                            color: '#248bb1'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#248bb1' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#248bb1' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#21568c'
                        },
                        itemStyle:{
                            color: '#21568c'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#21568c' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#21568c' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartTCP2.setOption(option);
        },
         /**
         * @description 初始化-数据感知-TCP建立时延无线侧+TCP建立时延核心侧
         */
        axiosChartTCP2 (params) {
            this.chartTCP2.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData5
                }, {
                    data: chartData12
                }]
            })
        },
        /**
         * @description 初始化-语音感知-语音接通率+视频接通率
         */
        initChartAV () {
            this.chartAV = echarts.init(document.getElementById('chartAV'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['语音接通率','视频接通率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '语音接通率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },{
                        name: '视频接通率',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartAV.setOption(option);
        },
        /**
         * @description 获取数据-语音感知-语音接通率+视频接通率
         */
        axiosChartAV (params) {
            this.chartAV.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-语音感知-语音掉线率+视频掉线率
         */
        initChartAV1 () {
            this.chartAV1 = echarts.init(document.getElementById('chartAV1'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['语音掉线率', '视频掉线率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '下行速率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#134b76'
                        },
                        lineStyle: { // 柱条
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#134b76' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#134b76' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol:"circle",
                        data: []
                    },
                    {
                        name: '下行速率(>500k)',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartAV1.setOption(option);
        },
        /**
         * @description 获取数据-语音感知-语音掉线率+视频掉线率
         */
        axiosChartAV1 (params) {
            this.chartAV1.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData10
                }, {
                    data: chartData11
                }]
            })
        },
        /**
         * @description 初始化-语音感知-SRVCC切换成功率
         */
        initChartSRVCC () {
            this.chartSRVCC = echarts.init(document.getElementById('chartSRVCC'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['SRVCC切换成功率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: 'SRVCC切换成功率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#20868d'
                        },
                        lineStyle:{
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#20868d' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#20868d' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",
                        data: []
                    }
                ]
            };
            this.chartSRVCC.setOption(option);
        },
        /**
         * @description 获取数据-语音感知-SRVCC切换成功率
         */
        axiosChartSRVCC (params) {
            this.chartSRVCC.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData11
                }]
            })
        },
         /**
         * @description 初始化-语音感知-上行丢包率
         */
        initChartLOSS () {
            this.chartLOSS = echarts.init(document.getElementById('chartLOSS'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
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
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行丢包率']
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
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上行丢包率',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#248bb1'
                        },
                        itemStyle:{
                            color: '#248bb1'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#248bb1' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#248bb1' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartLOSS.setOption(option);
        },
         /**
         * @description 初始化-语音感知-上行丢包率
         */
        axiosChartLOSS (params) {
            this.chartLOSS.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData5
                }]
            })
        },
    },
})
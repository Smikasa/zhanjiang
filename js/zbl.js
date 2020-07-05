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
        // 图标
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
            // 图表
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
         * @description 上下行流量+无线利用率
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
            this.chartSX.setOption(option);
        },
        /**
        * 获取数据-上下行流量+无线利用率
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
         * @description PRC连接数+峰值用户数+无线接通率
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
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                },{
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
        * 获取数据-PRC连接数+峰值用户数+无线接通率
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
         * @description 无线掉线率+切换成功率+上行干扰电平
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
                            type:"dotted"
                        },
                        data: []
                    },
                    {
                        name: '切换成功率',
                        type: 'line',
                        areaStyle: {
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238aaf' // 0% 处的颜色
                                },{
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
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238b8f' // 0% 处的颜色
                                },{
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
        * 获取数据-无线掉线率+切换成功率+ 上行干扰电平
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
         * @description PRB上下行利用率
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
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0c324f' // 0% 处的颜色
                                },{
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
                            color:{
                                type: 'linear',
                                // x: 0,
                                // y: 0,
                                // x2: 0,
                                // y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0a4051' // 0% 处的颜色
                                },{
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
        * 获取数据-PRB上下行利用率
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
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{a} <br/>{b}: {c} ({d}%)'
                // },
                tooltip: null,
                animation :false,
                legend: null,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['58%', '70%'],
                        avoidLabelOverlap: false,
                        // label: {
                        //     show: false,
                        //     position: 'center'
                        // },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {
                                itemStyle: {
                                    color:'#0079b7',
                                },
                                selected:false,
                                label:{
                                    position:'center',
                                    formatter: '{d}%',
                                    color:"#fff",
                                    fontSize:28,
                                },
                                value: 40.21, 
                                name: '底色'
                            },
                            {
                                markPoint:{
                                    itemStyle: {
                                        color:'#0079b7',
                                        barBorderRadius:23,
                                    },
                                },
                                itemStyle: {
                                    color:'#01283d',
                                    borderColor:"#0079b7",
                                    borderWidth:1,
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
            this.chartPIE1.setOption({series: [
                {
                    data: [
                        {
                            itemStyle: {
                                color:'#0079b7',
                            },
                            selected:false,
                            label:{
                                position:'center',
                                formatter: '{d}%',
                                color:"#fff",
                                fontSize:28,
                            },
                            value: pie1, 
                            name: '底色'
                        },
                        {
                            markPoint:{
                                itemStyle: {
                                    color:'#0079b7',
                                    barBorderRadius:23,
                                },
                            },
                            itemStyle: {
                                color:'#01283d',
                                borderColor:"#0079b7",
                                borderWidth:1,
                            },
                            value: pie2, 
                            name: '底色'
                        },
                    ]
                }
            ]});
            this.chartPIE2.setOption({series: [
                {
                    data: [
                        {
                            itemStyle: {
                                color:'#0079b7',
                            },
                            selected:false,
                            label:{
                                position:'center',
                                formatter: '{d}%',
                                color:"#fff",
                                fontSize:28,
                            },
                            value: pie3, 
                            name: '底色'
                        },
                        {
                            markPoint:{
                                itemStyle: {
                                    color:'#0079b7',
                                    barBorderRadius:23,
                                },
                            },
                            itemStyle: {
                                color:'#01283d',
                                borderColor:"#0079b7",
                                borderWidth:1,
                            },
                            value: pie4, 
                            name: '底色'
                        },
                    ]
                }
            ]});
            this.chartPIE3.setOption(option);
            this.chartPIE4.setOption(option);
            this.chartPIE5.setOption(option);
            this.chartPIE6.setOption(option);
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

    },
})
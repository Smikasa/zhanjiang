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
                class: 'main-info-icon-communities',
            }, {
                id: 'overseas',
                name: '工单总数',
                Num: 0,
                class: 'main-info-icon-communities',
            }, {
                id: 'venueIn',
                name: '到岗人员数',
                Num: 0,
                class: 'main-info-icon-communities',
            }
        ],
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
    },
})
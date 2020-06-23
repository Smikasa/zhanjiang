let zblVue = new Vue({
    el:"#zblApp",
    data:{
        nowDate:'',
        nowTime:'',
        nowWeek:'',
    },
    mounted() {
        this.setNowTimes();
    },
    methods: {
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
          }
    },
})
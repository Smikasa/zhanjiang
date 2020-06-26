var AllPeopleNumber = {
    success: true,
    code: 1000,
    data: {
        allNum: 999999,
        venueIn: {
            Num: 111111,
            Ratio: '30%',
            Yesterday: '+100'
        },
        venueOut: {
            Num: 22222,
            Ratio: '30%',
            Yesterday: '+100'
        },
        churchyard: {
            Num: 33333,
            Ratio: '30%',
            Yesterday: '+100'
        },
        overseas: {
            Num: 44444,
            Ratio: '30%',
            Yesterday: '+100'
        }
    }
}

var PeopleNumberByTime1 = {
    success: true,
    code: 1000,
    data: {
        Today: [{
            Time: '12:12',
            Num: 12
        }, {
            Time: '12:13',
            Num: 13
        },
        {
            Time: '12:14',
            Num: 14
        },
        {
            Time: '12:15',
            Num: 10
        },
        {
            Time: '12:16',
            Num: 18
        },
        {
            Time: '12:17',
            Num: 8
        },
        {
            Time: '12:18',
            Num: 10
        }
    ],
        Yesterday: [{
            Time: '12:12',
            Num: 9
        }, {
            Time: '12:13',
            Num: 8
        },
        {
            Time: '12:14',
            Num: 7
        },
        {
            Time: '12:15',
            Num: 4
        },
        {
            Time: '12:16',
            Num: 13
        },
        {
            Time: '12:17',
            Num: 4
        },
        {
            Time: '12:18',
            Num: 12
        }
    ]
    }
}

var PeopleNumberByTime2 = {
    success: true,
    code: 1000,
    data: {
        Today: [{
            Time: '12:15',
            Num: 12
        }, {
            Time: '12:16',
            Num: 6
        },
        {
            Time: '12:17',
            Num: 3
        },
        {
            Time: '12:18',
            Num: 8
        },
        {
            Time: '12:19',
            Num: 5
        },
        {
            Time: '12:20',
            Num: 11
        },
        {
            Time: '12:21',
            Num: 9
        }
    ],
        Yesterday: [{
            Time: '12:15',
            Num: 4
        }, {
            Time: '12:16',
            Num: 12
        },
        {
            Time: '12:17',
            Num: 6
        },
        {
            Time: '12:18',
            Num: 8
        },
        {
            Time: '12:19',
            Num: 3
        },
        {
            Time: '12:20',
            Num: 10
        },
        {
            Time: '12:21',
            Num: 7
        }
    ]
    }
}

var PeopleModelType = {
    success: true,
    code: 1000,
    data: [{
        Name: '华为Mate30',
        Num: 18
    },{
        Name:'iphone 11',
        Num:14
    },{
        Name:'三星 S20',
        Num:20
    },
    {
        Name:'OPPO r17',
        Num:16
    },
    {
        Name:'华为Mate Xs',
        Num:20
    }]
}

var chinaData = [
    [{ name: '安徽',value: 10000}, { name: '山东', value: 5 }],
    [{ name: '安徽',value: 10000}, { name: '山西', value: 15 }],
    [{ name: '安徽',value: 10000}, { name: '广东', value: 595 }],
    [{ name: '安徽',value: 10000}, { name: '广西', value: 25 }],
    [{ name: '安徽',value: 10000 }, { name: '北京', value: 45 }],
    [{ name: '安徽',value: 10000 }, { name: '辽宁', value: 35 }],
    [{ name: '安徽',value: 10000 }, { name: '海南', value: 345 }],
    [{ name: '安徽',value: 10000 }, { name: '新疆', value: 123 }],
    [{ name: '安徽',value: 10000 }, { name: '内蒙古', value: 65 }],
    [{ name: '安徽',value: 10000 }, { name: '甘肃', value: 725 }],
    [{ name: '安徽',value: 10000 }, { name: '河南', value: 365 }],
    [{ name: '安徽',value: 10000 }, { name: '湖南', value: 5435 }],
    [{ name: '安徽',value: 10000 }, { name: '浙江', value: 765 }],
    [{ name: '安徽',value: 10000 }, { name: '江苏', value: 345 }],
    [{ name: '安徽',value: 10000 }, { name: '黑龙江', value: 975 }],
    [{ name: '安徽',value: 10000 }, { name: '吉林', value: 525 }],
    [{ name: '安徽',value: 10000 }, { name: '陕西', value: 575 }],
    [{ name: '安徽',value: 10000 }, { name: '四川', value: 545 }],
    [{ name: '安徽',value: 10000 }, { name: '福建', value: 165 }],
    [{ name: '安徽',value: 10000 }, { name: '云南', value: 78 }],
    [{ name: '安徽',value: 10000 }, { name: '江西', value: 95 }],
    [{ name: '安徽',value: 10000 }, { name: '西藏', value: 63 }],
    [{ name: '安徽',value: 10000 }, { name: '青海', value: 65 }],
    [{ name: '安徽',value: 10000 }, { name: '香港', value: 175 }],
    [{ name: '安徽',value: 10000 }, { name: '澳门', value: 85 }],
    [{ name: '安徽',value: 10000 }, { name: '台湾', value: 135 }],
    [{ name: '安徽',value: 10000 }, { name: '天津', value: 515 }],
    [{ name: '安徽',value: 10000 }, { name: '宁夏', value: 115 }],
    [{ name: '安徽',value: 10000 }, { name: '上海', value: 155 }],
    [{ name: '安徽',value: 10000 }, { name: '重庆', value: 215 }],

];
var worldData = [
    // [{ name: 'Denmark' }, { name: 'Denmark', value: 5 }],
    [{ name: 'China', value: 100 }, { name: 'Spain', value: 15 }],
    [{ name: 'China', value: 100}, { name: 'France', value: 595 }],
    [{ name: 'China', value: 100 }, { name: 'United Kingdom', value: 25 }],
    
];
var beijingData = [
    // [{ name: '朝阳区', value: 100 }, { name: '朝阳区', value: 5 }],
    [{ name: '朝阳区', value: 100 }, { name: '丰台区', value: 15 }],
    [{ name: '朝阳区', value: 100 }, { name: '石景山区', value: 595 }],

];
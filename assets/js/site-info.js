// 营业时间与午餐价格的唯一数据源。
// 修改时间或价格只需改这里，首页、营业时间页、联系页和菜单页都会自动更新。
window.siteInfo = {
    timeZone: 'Europe/Helsinki',

    // days: 0 = 周日, 1 = 周一 … 6 = 周六
    hours: [
        {
            labelKey: 'weekdayRange',
            days: [1, 2, 3, 4, 5],
            open: '10:30',
            close: '20:00',
            lunchStart: '10:30',
            lunchEnd: '19:00'
        },
        {
            labelKey: 'weekendRange',
            days: [6, 0],
            open: '11:30',
            close: '20:00',
            lunchStart: '11:30',
            lunchEnd: '19:00'
        }
    ],

    // 节假日等特殊安排，按日期 (YYYY-MM-DD) 覆盖上面的常规时间。
    // 例: '2026-12-24': { closed: true },
    //     '2026-12-31': { open: '11:30', close: '16:00' }
    exceptions: {},

    // 午餐价格。price 为数字（欧元）；perYearOfAge 为按儿童年龄计价。
    lunchPrices: [
        { labelKey: 'adultWeekday', hoursIndex: 0, price: 13.5 },
        { labelKey: 'adultWeekend', hoursIndex: 1, price: 15.5 },
        { labelKey: 'childrenAge', price: 1, perYearOfAge: true, descriptionKey: 'childrenAgeLong' }
    ]
};

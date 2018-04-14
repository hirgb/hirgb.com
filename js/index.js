function loadData(data, element) {
    let chart = echarts.init(element);
    let option = {
        title: {
            text: data.name + '-' + data.code,
            link: '/detail/?stockcode=' + data.code,
            target: 'black',
            textStyle: {
                color: '#eee',
            }
        },
        tooltip: {
            trigger: 'axis',
            position: ['1%', '15%'],
            backgroundColor: ''
        },
        grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.date,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: function(value) {
                return value.min - (value.max - value.min) / 5
            },
            max: function(value) {
                return value.max + (value.max - value.min) / 5
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            boundaryGap: [0, '100%']
        },
        series: [{
            name: '指数',
            type: 'line',
            smooth: false,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(204, 255, 51)'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    ])
                }
            },
            data: data.value
        }]
    };
    chart.setOption(option);
}

function loadIndustryData(data, element) {
    let chart = echarts.init(element);
    let xAxisData = data.name;
    let value = data.value;
    let option = {
        title: {
            text: '行业资金流向（亿元）',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let label = params[0].axisValueLabel;
                let value = params[0].data;
                let flag = '资金流入:';
                let marker = params[0].marker;
                return label + '<br />' + marker + flag + value + '亿元';
            }
        },
        grid: {
            top: '20%',
            bottom: '10%',
            left: '5%',
            right: '5%'
        },
        xAxis: {
            axisLabel: {
                show: false,
                rotate: 45
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            data: xAxisData,
            silent: true,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            name: 'bar',
            type: 'bar',
            data: value,
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8,
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    }
                },
                emphasis: {
                    shadowColor: 'rgba(0,0,0,0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8
                }
            },
            animationDelay: function(idx) {
                return idx * 30;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
            return idx * 5;
        }
    };
    chart.setOption(option);
}

function loadConceptData(data, element) {
    let chart = echarts.init(element);
    let xAxisData = data.name;
    let value = data.value;
    let option = {
        title: {
            text: '概念资金流向（亿元）',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let label = params[0].axisValueLabel;
                let value = params[0].data;
                let flag = '资金流入:';
                let marker = params[0].marker;
                return label + '<br />' + marker + flag + value + '亿元';
            }
        },
        grid: {
            top: '20%',
            bottom: '15%',
            left: '5%',
            right: '5%'
        },
        xAxis: {
            axisLabel: {
                show: true,
                rotate: 45
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            data: xAxisData,
            silent: true,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            name: 'bar',
            type: 'bar',
            data: value,
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8,
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    }
                },
                emphasis: {
                    shadowColor: 'rgba(0,0,0,0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8
                }
            },
            animationDelay: function(idx) {
                return idx * 30;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
            return idx * 5;
        }
    };
    chart.setOption(option);
}

function loadAreaData(data, element) {
    let chart = echarts.init(element);
    let xAxisData = data.name;
    let value = data.value;
    let option = {
        title: {
            text: '区域资金流向（亿元）',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let label = params[0].axisValueLabel;
                let value = params[0].data;
                let flag = '资金流入:';
                let marker = params[0].marker;
                return label + '<br />' + marker + flag + value + '亿元';
            }
        },
        grid: {
            top: '20%',
            bottom: '10%',
            left: '5%',
            right: '5%'
        },
        xAxis: {
            axisLabel: {
                show: true,
                rotate: 45
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            data: xAxisData,
            silent: true,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            name: 'bar',
            type: 'bar',
            data: value,
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8,
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    }
                },
                emphasis: {
                    shadowColor: 'rgba(0,0,0,0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 8
                }
            },
            animationDelay: function(idx) {
                return idx * 30;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
            return idx * 5;
        }
    };
    chart.setOption(option);
}

function loadOverViewData(data, element) {
    let chart = echarts.init(element);
    let dataXaxis = data.map(function(item, index, array) {
        return item['name'];
    });
    let dataIn = data.map(function(item, index, array) {
        return item['in'] / 10000;
    });
    let dataOut = data.map(function(item, index, array) {
        return item['out'] / 10000;
    });
    let dataPurein = data.map(function(item, index, array) {
        return item['pure_in'] / 10000;
    });
    let option = {
        // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        color: ['#990000', '#006600', '#4cabce'],
        title: {
            text: '资金流向总览（亿元）',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['资金流入', '资金流出', '资金净流入'],
            left: 'right'
        },
        grid: {
            top: '20%',
            bottom: '10%',
            left: '5%',
            right: '5%'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: dataXaxis
        }],
        yAxis: [{
            type: 'value',
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        }],
        series: [{
                name: '资金流入',
                type: 'bar',
                barGap: 0,
                data: dataIn
            },
            {
                name: '资金流出',
                type: 'bar',
                data: dataOut
            },
            {
                name: '资金净流入',
                type: 'bar',
                data: dataPurein
            }
        ]
    };
    chart.setOption(option);
}

function loadZdfbData(data, element) {
    let chart = echarts.init(element);
    let option = {
        title: {
            text: '涨跌分布',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} 支({d}%)"
        },
        series: [{
                name: '涨跌数量',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '50%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data.zd
            },
            {
                name: '涨跌分布',
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    }
                },
                radius: ['60%', '80%'],
                data: data.fb
            }
        ]
    };
    chart.setOption(option);
}

function loadDppjData(data, element) {
    let a = [];
    let obj = {
        value: data.value
    };
    let title = '大盘评级 - '
    if (obj.value < 2.5) {
        title += '大盘风险极大，请勿参与';
    } else if (obj.value >= 2.5 && obj.value < 4) {
        title += '大盘风险较大，请谨慎参与';
    } else if (obj.value >= 4 && obj.value < 6) {
        title += '大盘震荡，适当参与';
    } else if (obj.value >= 6 && obj.value < 8) {
        title += '大盘走势良好，积极参与';
    } else if (obj.value >= 8) {
        title += '大盘走势极好，积极参与';
    }
    a.push(obj);
    let chart = echarts.init(element);
    option = {
        title: {
            text: title,
            textStyle: {
                color: '#666'
            }
        },
        series: [{
            min: 0,
            max: 10,
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    width: 20
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: '#333',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 8
                }
            },
            detail: {
                formatter: '{value}'
            },
            data: a
        }]
    };
    chart.setOption(option);
}

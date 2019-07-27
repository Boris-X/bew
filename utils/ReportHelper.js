import * as moment from 'moment';
export default new class ReportHelper {
    genEntity(title, source, opt) {
        const rs = {
            "Team Member": {
                color: '',
                comment: '',
                value: title,
                id: `${title.replace(/ /g, '')}-TeamMember_${opt.Year}_${moment.monthsShort()[opt.Month - 1]}`
            },
            "Total": {
                color: '',
                comment: '',
                value: 0,
                id: `${title.replace(/ /g, '')}-Total_${opt.Year}_${moment.monthsShort()[opt.Month - 1]}`
            }
        }
        source.Operators.map(r => {
            rs[r] = {
                color: '',
                comment: '',
                value: 0,
                id: `${title.replace(/ /g, '')}-${r.replace(/ /g, '')}_${opt.Year}_${moment.monthsShort()[opt.Month - 1]}`
            }
        })
        return rs;
    }

    genDataSource(source, log) {
        const dataSource = [];
        console.log(source);
        if (source && source.List.length > 0) {
            /** 
             * Total Courtesy Call
            */
           
            const opt = {
                Year: source.List[0].Year,
                Month: source.List[0].Month
            }
            const TCC = source.List.find(r => (r.Name === "Total Courtesy Calls"));
            const _arr1 = this.genEntity('Total Courtesy Call', source, opt);
            TCC && TCC.Data.forEach(element => {
                _arr1[element.Operator].value = element.Value;
            });
            _arr1.Total.value = TCC.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr1);

            /** 
             * % of Total Team Calls
            */
            const _arr2 = this.genEntity('% of Total Team Calls', source, opt);
            TCC && TCC.Data.forEach(element => {
                _arr2[element.Operator].value = ((element.Value / _arr1.Total.value) * 100).toFixed(2) + '%';
            });
            dataSource.push(_arr2);

            /**
             * Total Answered Calls
             */
            const TAC = source.List.find(r => (r.Name === "Total Answered Calls"));
            const _arr3 = this.genEntity('Total Answered Calls', source, opt);
            TAC && TAC.Data.forEach(element => {
                _arr3[element.Operator].value = element.Value;
            });
            _arr3.Total.value = TAC.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr3);

            /**
             * Rate of Answered Calls
             */
            const _arr4 = this.genEntity('Rate of Answered Calls', source, opt);
            TAC && TAC.Data.forEach(element => {
                _arr4[element.Operator].value = ((element.Value / _arr1[element.Operator].value) * 100).toFixed(2) + '%';
            });
            _arr4.Total.value = (_arr3.Total.value * 100 / _arr1.Total.value).toFixed(2) + '%';
            dataSource.push(_arr4);

            /**
             * Total Promises
             */
            const promisses = source.List.filter(r => (r.Name.indexOf('Promises') >= 0));
            const _arr5 = this.genEntity('Total Promises', source, opt);

            promisses.forEach(r => {
                r.Data.map(element => {
                    _arr5[element.Operator].value += element.Value;
                })
                _arr5.Total.value = r.Data.reduce((a, b) => a + b.Value, 0);
            });
            dataSource.push(_arr5);


            /**
             * Rate of Promises
             */
            const _arr6 = this.genEntity('Rate of Promises', source, opt);
            promisses.map(r => {
                r.Data.map(element => {
                    _arr6[element.Operator].value += parseFloat(((element.Value / _arr3[element.Operator].value) * 100).toFixed(2));
                    _arr6[element.Operator].value = Math.round(_arr6[element.Operator].value * 100) / 100;
                })
            });
            Object.keys(_arr6).map(key => {
                if (key !== 'Team Member' && key !== 'Total') _arr6[key].value += '%';
            })
            dataSource.push(_arr6);

            /**
             * Total 1st Promises
             */
            const T1P = source.List.find(r => (r.Name === "Total 1st Promises"));
            const _arr7 = this.genEntity('Total 1st Promises', source, opt);

            T1P && T1P.Data.forEach(element => {
                _arr7[element.Operator].value = element.Value;
            });
            _arr7.Total.value = T1P && T1P.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr7);

            /**
             * Total 2nd Promises
             */
            const T2P = source.List.find(r => (r.Name === "Total 2nd Promises"));
            const _arr8 = this.genEntity('Total 2nd Promises', source, opt);

            T2P && T2P.Data.forEach(element => {
                _arr8[element.Operator].value = element.Value;
            });
            _arr8.Total.value = T2P && T2P.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr8);

            /**
             * Total 3rd Promises
             */
            const T3P = source.List.find(r => (r.Name === "Total 3rd Promises"));
            const _arr9 = this.genEntity('Total 3rd Promises', source, opt);

            T3P && T3P.Data.forEach(element => {
                _arr9[element.Operator].value = element.Value;
            });
            _arr9.Total.value = T3P && T3P.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr9);

            /**
            * Total Disconnected/Cannot connect
            */
            const TD = source.List.find(r => (r.Name === "Total Disconnected/Cannot connect"));
            const _arr10 = this.genEntity('Total Disconnected/Cannot connect', source, opt);
            TD && TD.Data.forEach(element => {
                _arr10[element.Operator].value = element.Value;
            });
            _arr10.Total.value = TD && TD.Data.reduce((a, b) => a + b.Value, 0);
            dataSource.push(_arr10);
            console.log(dataSource);

            log.colors && Object.keys(log.colors).map(id => {
                dataSource.find(ele => {
                    Object.keys(ele).map(key => {
                        if (ele[key].id === id) { ele[key].color = log.colors[id] };
                    })
                })
            })

            log.comments && Object.keys(log.comments).map(id => {
                dataSource.find(ele => {
                    Object.keys(ele).map(key => {
                        if (ele[key].id === id) { ele[key].comment = log.comments[id] };
                    })
                })
            })
            return dataSource;
        } else {
            return [];
        }
    };

    genFields(source) {
        let fields = [];
        fields.push('Team Member');
        fields = fields.concat(source.Operators);
        fields.push('Total');
        return fields;
    };

    genColumn(year) {
        const column = [
            {
                label: 'Title',
                isTitle: true
            },

            {
                label: 'Average',
                isAvg: true
            }
        ];
        if (year.type === 'Financial Year') {
            console.log('year.key', year.key[0]);
            const _start = moment().set({ 'year': year.key[0], 'month': 6 });
            for (let i = 0, j = 0; i < 12; i++) {
                column.push({
                    label: `${moment.monthsShort(_start.get('month'))}`,
                });
                _start.add('month', 1);
            }
        } else if (year.type === 'Calendar Year') {
            const _start = moment().set({ 'year': year.key[0], 'month': 0 });
            for (let i = 0, j = 0; i < 12; i++) {
                column.push({
                    label: `${moment.monthsShort(_start.get('month'))}`,
                });
                _start.add('month', 1);
            }
        }
        return column;
    };

    setFieldColorCommentByLog(source, log) {
        if (log) {
            console.log(log);
            Object.keys(log.colors).map(r => {
                const _id = r;
                const _color = log.colors[r];
                source.map(s => {
                    Object.keys(s).map(v => {
                        if (s[v].id === _id) {
                            s[v].color = _color;
                        }
                    })
                    // s["_cellVariants"] = _cellVariants;
                });
            });
            Object.keys(log.comments).map(r => {
                const _id = r;
                const _comment = log.comments[r];
                source.map(s => {
                    Object.keys(s).map(v => {
                        if (s[v].id === _id) {
                            s[v].comment = _comment;
                        }
                    })
                    // s["_cellVariants"] = _cellVariants;
                });
            });
        }
    }

    formatter(value, type) {
        switch (type) {
            case "percent": {
                return new Intl.NumberFormat("asf", {
                    style: "percent",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                }).format(value);
            };
            case "currency": {
                return new Intl.NumberFormat("asf", {
                    style: "currency",
                    currency: "AUD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(value).replace(/A/, "");
            };
            default: return value;
        }
    }

    getCommentId(row, idx) {
        if (row.year.includes('-')) {
            if (!row.year1) {
                row.year1 = row.year.split('-')[0];
                row.year2 = row.year.split('-')[1];
            }
            const _y = idx <= 6 ? row.year1 : row.year2;
            const _m = idx <= 6 ? idx + 6 : idx - 6;
            return (row.lender + '_' + _y + '_' + row.data_name + '_' + _m).replace(new RegExp(' ', 'g'), '').replace(new RegExp('\%', 'g'), '').replace(new RegExp(':', 'g'), '-');
        } else {
            return (row.lender + '_' + row.year + '_' + row.data_name + '_' + idx).replace(new RegExp(' ', 'g'), '').replace(new RegExp('\%', 'g'), '').replace(new RegExp(':', 'g'), '-');
        }
    }
}
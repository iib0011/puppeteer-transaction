function calculate(daysToEvaluate) {
    console.log("Started");
    setTimeout(() => {
        const existCondition1 = setInterval(async function () {
            const dropDown = document.querySelector("#tab-user-deals-history > div.cb-filter.cb-filter_with-tabs > div.cb-filter__item.cb-filter__item_size-small-l.cb-filter__item_size-large-m.deal-history-account-filter > div:nth-child(2) > div > div.input-container.drop-down-plain-value > span");
            if (dropDown) {
                dropDown.click();
                clearInterval(existCondition1);
                const demo = document.querySelector("#tab-user-deals-history > div.cb-filter.cb-filter_with-tabs > div.cb-filter__item.cb-filter__item_size-small-l.cb-filter__item_size-large-m.deal-history-account-filter > div:nth-child(2) > div > div.drop-down-plain-content > div > ul > li:nth-child(2)");
                demo.click();
                const existCondition2 = setInterval(async function () {
                        const table = document.getElementsByTagName("table").item(0)
                        if (table) {
                            clearInterval(existCondition2);
                            const today = new Date();
                            const dd = today.getDate();
                            let tableBody = table.children[1];
                            let lost = [];
                            let won = [];
                            async function scrollPage() {
                                return new Promise((resolve, reject) => {
                                    if (tableBody.children[tableBody.children.length - 1].children[2].children[1].innerHTML.slice(0, 2) >= dd - daysToEvaluate + 1) {
                                        window.scrollTo(0, document.body.scrollHeight);
                                        console.log("Scrolled");
                                        const table = document.getElementsByTagName("table").item(0)
                                        tableBody = table.children[1];
                                        setTimeout(async () => {
                                            await scrollPage().then(resolve)
                                        }, 2000)
                                    } else {
                                        return resolve("Finished scrolling")
                                    }
                                })
                            }
                            await scrollPage();
                            const reg = /off|cancel/
                            for (let row of tableBody.children) {
                                if (parseInt(row.children[2].children[1].innerHTML.slice(0, 2)) >= dd - daysToEvaluate + 1) {
                                    if (!reg.test(row.children[5].children[0].className)) {
                                        row.children[5].children[0].innerHTML == "0.00" ? lost.push(parseFloat(row.children[4].children[1].innerHTML)) : won.push(parseFloat(row.children[4].children[1].innerHTML))
                                    }
                                } else {
                                    break;
                                }
                            }
                            const gain = won.reduce((acc, curr) => {
                                return acc + curr;
                            }, 0)
                            const loss = lost.reduce((acc, curr) => {
                                return acc + curr;
                            }, 0)
                            const benefit = gain - loss;
                            const winRatio = won.length / (won.length + lost.length)
                            console.log("Benefit", benefit, "Winratio", winRatio)
                        }
                    },
                    1000);
            }
        }, 2000);
    });
};
calculate(6);
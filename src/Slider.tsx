import React, { useEffect, useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'


import classes from './Slider.module.scss'

const currenciesArrTemp = [
    {
        id: 0,
        title: 'LTC',
    },
    {
        id: 1,
        title: 'DASH',
    },
    {
        id: 2,
        title: 'BTC',
    },
    {
        id: 3,
        title: 'USD',
    },
    {
        id: 4,
        title: 'ETH',
    },
    {
        id: 5,
        title: 'BCH',
    }
]

const Slider = () => {

    const [currentItem, setCurrentItem] = useState<number>(0)
    const [currenciesArr, setCurrenciesArr] = useState(currenciesArrTemp)

    const currenciesWrapperRef = useRef<HTMLDivElement | null>(null)
    const prevRef = useRef<HTMLDivElement | null>(null)
    const nextRef = useRef<HTMLDivElement | null>(null)

    const next = () => {
        if (currenciesWrapperRef.current) {
            currenciesWrapperRef.current.style.transitionDuration = '200ms'
            currenciesWrapperRef.current.style.transform = `translateX(${-(95)}px)`;
            let tempArr = [...currenciesArr]
            const tempItem = tempArr.shift()
            if (tempItem) {
                tempArr.push(tempItem)
            }

            setTimeout(() => {
                if (currenciesWrapperRef.current) {
                    currenciesWrapperRef.current.style.transitionDuration = '0ms'
                    currenciesWrapperRef.current.style.transform = `translateX(-42px)`;
                }
                setCurrenciesArr(tempArr)
            }, 200)
        }
        else {
            setCurrentItem((currentItem) => currentItem + 1)
        }
    }

    const prev = () => {
        if (currenciesWrapperRef.current) {
            currenciesWrapperRef.current.style.transitionDuration = '200ms'
            currenciesWrapperRef.current.style.transform = `translateX(${7}px)`;
            let tempArr = [...currenciesArr]
            const tempItem = tempArr.pop()
            if (tempItem) {
                tempArr.unshift(tempItem)
            }

            setTimeout(() => {
                if (currenciesWrapperRef.current) {
                    currenciesWrapperRef.current.style.transitionDuration = '0ms'
                    currenciesWrapperRef.current.style.transform = `translateX(-42px)`;
                }
                setCurrenciesArr(tempArr)
            }, 200)
        }
    }

    return (
        <div className={classes.container}>
            <span>Currency:</span>
            <div>
                <div>
                    <button onClick={prev}>
                        <MdArrowBackIos />
                    </button>
                </div>
                <div className={classes.currenciesWrapper}>
                    <div ref={currenciesWrapperRef} style={{ transform: `translateX(-40px)` }} >
                        <div ref={prevRef} className={`${classes.currency}`}>
                            <span>{currenciesArr[currenciesArr.length - 1].title}</span>
                        </div>
                        <div className={classes.currencies}>
                            {currenciesArr.map(currency =>
                                <div
                                    onClick={() => { setCurrentItem(currency.id) }}
                                    className={`${classes.currency} ${currentItem === currency.id && classes.active}`}
                                    key={currency.id}>
                                    <span>{currency.title}</span>
                                </div>
                            )}
                        </div>
                        <div ref={nextRef} className={`${classes.currency}`}>
                            <span>{currenciesArr[0].title}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={next}>
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
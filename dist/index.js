var _this
class Tar {
    constructor(el, nel, num) {
        _this = this
        this.SwitchEl = document.querySelectorAll(el)[num]
        this.init(el, num, nel)
        this.add(el, num, nel)
    }
    init(el, num, nel) {
        //初始化
        document
            .querySelectorAll(el)
            [num].children[0].classList.add("js-ready", "js-show", "js-pan")
        document
            .querySelectorAll(nel)
            [num].children[0].children[0].classList.add("sw_navActive")
    }
    add(el, num, nel) {
        var Sel = document.querySelectorAll(el)[num]
        var Snel = document.querySelectorAll(nel)[num]
        var index = 0
        var count
        var startX = 0
        var startY = 0
        var moveX = 0
        var moveY = 0
        var w = Sel.offsetWidth
        var moveFlg = false

        // 自动轮播 定时器
        var timer = setInterval(function () {
            //获取项目数
            count = Sel.children.length
            if (count === 1) return
            if (index === count) index = 0
            // console.log('隐藏：'+index);
            Sel.children[index].classList.replace("js-show", "js-hide")
            //动画结束执行事件
            Sel.children[index].addEventListener(
                "transitionend",
                function (e) {
                    e.stopPropagation()
                    if (e.target != this) return
                    if (index === 0) {
                        //下一张到第一张 移除末尾的
                        Sel.children[count - 1].classList.remove(
                            "js-ready",
                            "js-show",
                            "js-pan",
                            "js-hide"
                        )
                    } else {
                        Sel.children[index - 1].classList.remove(
                            "js-ready",
                            "js-show",
                            "js-pan",
                            "js-hide"
                        )
                    }
                    // console.log(e); 执行多次
                },
                false
            )
            index++
            if (index === count) {
                index = 0
            }
            // console.log('添加的索引：'+index);
            //轮播导航
            Sel.children[index].classList.add("js-ready", "js-show", "js-pan")
            //清除 sw_navActive
            for (var i = 0; i < count; i++) {
                Snel.children[0].children[i].className = ""
            }
            Snel.children[0].children[index].classList.add("sw_navActive")
        }, 3000)

        //开始触摸
        Sel.addEventListener(
            "touchstart",
            function (e) {
                e.stopPropagation()
                clearInterval(timer)
                //开始坐标
                startX = e.targetTouches[0].pageX
                startY = e.targetTouches[0].pageY
                // console.log('start:'+index);
            },
            true
        )

        //触摸途中
        Sel.addEventListener("touchmove", function (e) {
            e.stopPropagation()
            // console.log('move:'+index);
            //移动距离
            moveX = e.targetTouches[0].pageX - startX
            moveY = Math.abs(e.targetTouches[0].pageY - startY)
            // console.log(moveX);
            var translateX
            if (moveX > 0 && moveX > moveY) {
                //right
                //移动了！！
                e.preventDefault()
                moveFlg = true
                translateX = -w + moveX
                if (index === 0) {
                    //从第一张到最后一张
                    Sel.children[count - 1].style.transform =
                        "translate3d(" + translateX + "px,0,0)"
                    Sel.children[count - 1].classList.add(
                        "js-dragging",
                        "js-pan"
                    )
                    //视觉效果
                    Sel.children[count - 1].children[0].style.transform =
                        "translate3d(" + -translateX + "px,0,0)"
                } else {
                    //正常
                    Sel.children[index - 1].style.transform =
                        "translate3d(" + translateX + "px,0,0)"
                    Sel.children[index - 1].classList.add(
                        "js-dragging",
                        "js-pan"
                    )
                    //视觉效果
                    Sel.children[index - 1].children[0].style.transform =
                        "translate3d(" + -translateX + "px,0,0)"
                }
            } else if (Math.abs(moveX) > moveY) {
                //left
                //移动了！！
                e.preventDefault()
                moveFlg = true
                translateX = w + moveX
                if (index === count - 1) {
                    //到最后一张后 第一张出来
                    Sel.children[0].style.transform =
                        "translate3d(" + translateX + "px,0,0)"
                    Sel.children[0].classList.add("js-dragging", "js-pan")
                    //视觉效果
                    Sel.children[0].children[0].style.transform =
                        "translate3d(" + -translateX + "px,0,0)"
                } else {
                    //正常
                    Sel.children[index + 1].style.transform =
                        "translate3d(" + translateX + "px,0,0)"
                    Sel.children[index + 1].classList.add(
                        "js-dragging",
                        "js-pan"
                    )
                    //视觉效果
                    Sel.children[index + 1].children[0].style.transform =
                        "translate3d(" + -translateX + "px,0,0)"
                }
            }
        })

        //结束触摸
        Sel.addEventListener("touchend", function (e) {
            e.stopPropagation()

            // console.log('end:'+index);
            // console.log(moveFlg);
            if (moveFlg) {
                //是否移动？？
                //松开滑动到0
                if (Math.abs(moveX) > 50) {
                    // console.log('滑动'+index);
                    //判断 左 or 右
                    if (moveX > 0) {
                        // right
                        if (index === 0) {
                            //到最后一个
                            index = count - 1
                            Sel.children[count - 1].classList.remove(
                                "js-dragging"
                            )
                            Sel.children[count - 1].classList.add(
                                "js-ready",
                                "js-show",
                                "js-end"
                            )
                            //视觉特效过度
                            Sel.children[count - 1].children[0].classList.add(
                                "js-end"
                            )
                            // Sel.children[0].style.transition = 'all 1s';
                            Sel.children[count - 1].style.transform =
                                "translate3d(0px,0,0)"
                            Sel.children[
                                count - 1
                            ].children[0].style.transform =
                                "translate3d(0px,0,0)"
                            //松手后移除上一个样式
                            Sel.children[count - 1].addEventListener(
                                "transitionend",
                                function (e) {
                                    if (e.target != this) return
                                    else {
                                        Sel.children[0].classList.remove(
                                            "js-ready",
                                            "js-show",
                                            "js-pan"
                                        )
                                        Sel.children[
                                            count - 1
                                        ].classList.remove("js-end")
                                        Sel.children[
                                            count - 1
                                        ].children[0].classList.remove("js-end")
                                    }
                                }
                            )
                            //nav
                            for (var i = 0; i < count; i++) {
                                Snel.children[0].children[i].className = ""
                            }
                            Snel.children[0].children[count - 1].classList.add(
                                "sw_navActive"
                            )
                            index = count - 1
                            moveFlg = false
                        } else {
                            //正常
                            Sel.children[index - 1].classList.remove(
                                "js-dragging"
                            )
                            Sel.children[index - 1].classList.add(
                                "js-ready",
                                "js-show",
                                "js-end"
                            )
                            //视觉特效过度
                            Sel.children[index - 1].children[0].classList.add(
                                "js-end"
                            )
                            // Sel.children[index+1].style.transition = 'all 1s';
                            Sel.children[index - 1].style.transform =
                                "translate3d(0px,0,0)"
                            Sel.children[
                                index - 1
                            ].children[0].style.transform =
                                "translate3d(0px,0,0)"
                            //松手后移除上一个样式
                            Sel.children[index - 1].addEventListener(
                                "transitionend",
                                function (e) {
                                    // e.stopPropagation();
                                    if (e.target != this) return
                                    else {
                                        Sel.children[
                                            index + 1
                                        ].classList.remove(
                                            "js-ready",
                                            "js-show",
                                            "js-pan",
                                            "js-end"
                                        )
                                        Sel.children[index].classList.remove(
                                            "js-end"
                                        )
                                        //视觉特效过度
                                        Sel.children[
                                            index
                                        ].children[0].classList.remove("js-end")
                                    }
                                },
                                true
                            )
                            //nav
                            for (var i = 0; i < count; i++) {
                                Snel.children[0].children[i].className = ""
                            }
                            Snel.children[0].children[index - 1].classList.add(
                                "sw_navActive"
                            )
                            index--
                            moveFlg = false
                        }
                    } else {
                        // left
                        if (index === count - 1) {
                            //到最后一个
                            index = 0
                            Sel.children[0].classList.remove("js-dragging")
                            Sel.children[0].classList.add(
                                "js-ready",
                                "js-show",
                                "js-end"
                            )
                            //视觉特效过度
                            Sel.children[0].children[0].classList.add("js-end")
                            // Sel.children[0].style.transition = 'all 1s';
                            Sel.children[0].style.transform =
                                "translate3d(0px,0,0)"
                            Sel.children[0].children[0].style.transform =
                                "translate3d(0px,0,0)"
                            //松手后移除上一个样式
                            Sel.children[0].addEventListener(
                                "transitionend",
                                function (e) {
                                    // console.log(e);
                                    if (e.target != this) return
                                    else {
                                        Sel.children[
                                            count - 1
                                        ].classList.remove(
                                            "js-ready",
                                            "js-show",
                                            "js-pan"
                                        )
                                        Sel.children[0].classList.remove(
                                            "js-end"
                                        )
                                        Sel.children[0].children[0].classList.remove(
                                            "js-end"
                                        )
                                    }
                                }
                            )
                            //nav
                            for (var i = 0; i < count; i++) {
                                Snel.children[0].children[i].className = ""
                            }
                            Snel.children[0].children[0].classList.add(
                                "sw_navActive"
                            )
                            index = 0
                            moveFlg = false
                        } else {
                            //正常
                            Sel.children[index + 1].classList.remove(
                                "js-dragging"
                            )
                            Sel.children[index + 1].classList.add(
                                "js-ready",
                                "js-show",
                                "js-end"
                            )
                            //视觉特效过度
                            Sel.children[index + 1].children[0].classList.add(
                                "js-end"
                            )
                            // Sel.children[index+1].style.transition = 'all 1s';
                            Sel.children[index + 1].style.transform =
                                "translate3d(0px,0,0)"
                            Sel.children[
                                index + 1
                            ].children[0].style.transform =
                                "translate3d(0px,0,0)"

                            //松手后移除上一个样式
                            Sel.children[index + 1].addEventListener(
                                "transitionend",
                                function (e) {
                                    // e.stopPropagation();
                                    if (e.target != this) return
                                    else {
                                        Sel.children[
                                            index - 1
                                        ].classList.remove(
                                            "js-ready",
                                            "js-show",
                                            "js-pan",
                                            "js-end"
                                        )
                                        Sel.children[index].classList.remove(
                                            "js-end"
                                        )
                                        //视觉特效过度
                                        Sel.children[
                                            index
                                        ].children[0].classList.remove("js-end")
                                    }
                                },
                                true
                            )
                            //nav
                            for (var i = 0; i < count; i++) {
                                Snel.children[0].children[i].className = ""
                            }
                            Snel.children[0].children[index + 1].classList.add(
                                "sw_navActive"
                            )
                            index++
                            moveFlg = false
                        }
                    }
                } else if (moveX !== 0) {
                    if (moveX > 0) {
                        if (index === 0) {
                            //最后一张
                            Sel.children[count - 1].style.transform =
                                "translate3d(" + w + "px,0,0)"
                            Sel.children[count - 1].classList.add("js-end")
                            setTimeout(function () {
                                Sel.children[count - 1].className =
                                    "switcher_item"
                                Sel.children[count - 1].style.transform =
                                    "translate3d(0,0,0)"
                                Sel.children[
                                    count - 1
                                ].children[0].style.transform =
                                    "translate3d(0,0,0)"
                            }, 400)
                        } else {
                            Sel.children[index - 1].style.transform =
                                "translate3d(" + w + "px,0,0)"
                            Sel.children[index - 1].classList.add("js-end")
                            setTimeout(function () {
                                Sel.children[index - 1].className =
                                    "switcher_item"
                                Sel.children[index - 1].style.transform =
                                    "translate3d(0,0,0)"
                                Sel.children[
                                    index - 1
                                ].children[0].style.transform =
                                    "translate3d(0,0,0)"
                            }, 400)
                        }
                    } else {
                        if (index === count - 1) {
                            //最后一张
                            Sel.children[0].style.transform =
                                "translate3d(" + w + "px,0,0)"
                            Sel.children[0].classList.add("js-end")
                            setTimeout(function () {
                                Sel.children[0].className = "switcher_item"
                                Sel.children[0].style.transform =
                                    "translate3d(0,0,0)"
                                Sel.children[0].children[0].style.transform =
                                    "translate3d(0,0,0)"
                            }, 400)
                        } else {
                            Sel.children[index + 1].style.transform =
                                "translate3d(" + w + "px,0,0)"
                            Sel.children[index + 1].classList.add("js-end")
                            setTimeout(function () {
                                Sel.children[index + 1].className =
                                    "switcher_item"
                                Sel.children[index + 1].style.transform =
                                    "translate3d(0,0,0)"
                                Sel.children[
                                    index + 1
                                ].children[0].style.transform =
                                    "translate3d(0,0,0)"
                            }, 400)
                        }
                    }
                }

                clearInterval(timer)
                timer = setInterval(function () {
                    //获取项目数
                    count = Sel.children.length
                    if (index === count) index = 0
                    // console.log('隐藏：'+index);
                    Sel.children[index].classList.replace("js-show", "js-hide")
                    //动画结束执行事件
                    Sel.children[index].addEventListener(
                        "transitionend",
                        function (e) {
                            e.stopPropagation()
                            // console.log(e);
                            if (index === 0) {
                                //下一张到第一张 移除末尾的
                                Sel.children[count - 1].classList.remove(
                                    "js-ready",
                                    "js-show",
                                    "js-pan",
                                    "js-hide"
                                )
                            } else {
                                Sel.children[index - 1].classList.remove(
                                    "js-ready",
                                    "js-show",
                                    "js-pan",
                                    "js-hide"
                                )
                            }
                            // console.log(e); 执行多次
                            return false
                        },
                        false
                    )
                    index++
                    if (index === count) {
                        index = 0
                    }
                    // console.log('添加的索引：'+index);
                    //轮播导航
                    Sel.children[index].classList.add(
                        "js-ready",
                        "js-show",
                        "js-pan"
                    )
                    //清除 sw_navActive
                    for (var i = 0; i < count; i++) {
                        Snel.children[0].children[i].className = ""
                    }
                    Snel.children[0].children[index].classList.add(
                        "sw_navActive"
                    )
                }, 3000)
            }
        })
    } //add
}

class Switch {
    // 获取总节点
    constructor(el, nel) {
        this.array = new Array()
        this.switch = document.querySelectorAll(el)
        for (var i = 0; i < this.switch.length; i++) {
            this.array[i] = new Tar(el, nel, i)
        }

        return this.array
    }
}

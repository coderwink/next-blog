import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'
type menuItem = {
    id: string;
    name: string;
    icon: string;
    path: string;
}
type menuNav<T> = T[];
export default React.memo(function NavBar() {
    // 菜单点击有个高亮效果
    // 只要是菜单就一定存在
    // const navigate: NavigateFunction = useNavigate()
    // 定义一个索引类型
    const memu: menuNav<menuItem> = [{
        id: '1',
        name: '文章',
        icon: 'icon-shu',
        path: '/blog',
    }, {
        id: '2',
        name: '标签',
        icon: 'icon-fenlei',
        path: '/classify',

    }, {
        id: '3',
        name: '关于我',
        icon: 'icon-caidanguanyuwo',
        path: '/about',

    }, {
        id: '4',
        name: '友链',
        icon: 'icon-lianjie',
        path: '/weblink',

    }]
    // 获取当前页面的路径值并获取对应路由的索引值
    // const { pathname } = useLocation();

    const defaultIndex = 0;

    // 默认值是0 博客
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // 高亮 尝试使用事件委派 这里还是不能使用，应为会适配多个情况，ID注册会有冲突
    const showHightLight = (e: Event) => {
        const el = e.target as HTMLElement;
        if (el?.nodeName == "UL") return;
        const index = Number(el?.getAttribute('data-info'));
        setCurrentIndex(index - 1);
        // navigate(memu[index - 1].path);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ulEvent = useCallback(function () {
        document.getElementById("good")?.addEventListener("click", showHightLight, false);
    }, []);

    // 服务端不能使用 干
    // 为什么使用这个API 就是因为他是同步的 ， 缺点就是回阻塞DOM渲染。
    // useLayoutEffect(() => {
    //     // 如defaultIndex的值为-1 则没有匹配的路由那么继续去以前的currentIndex值 如果没有以前的值则不取很正常
    //     if (defaultIndex === -1) return;
    //     setCurrentIndex(defaultIndex);
    // }, [defaultIndex]);

    useEffect(() => {
        // 注册事件 这里永远只会运行一次哇
        ulEvent();
        return () => document.getElementById("good")?.removeEventListener("click", showHightLight, false);
    }, []);

    return (
        <ul id='good' className='fixed top-0 left-0 bg-white w-full h-full flex items-center align-middle z-50 md:static md:rounded-xl'>
            {
                memu.map((item: menuItem, index: number) => {
                    return (
                        <li data-info={item.id} key={item.id}
                            // className={`${currentIndex == index ? 'border-indigo-600 text-indigo-600' : 'text-zinc-700'}  
                            //     text-center flex border-b-2 flex-col justify-center cursor-pointer box-border p-1
                            //     md:hover:text-indigo-600 md:border-none md:py-4`}
                            className='text-center flex border-b-2 flex-col justify-center cursor-pointer box-border p-1 md:border-none md:py-4'
                        >
                            <Link href={item.path}>
                                {/* <i data-info={item.id} className={`${item.icon} iconfont block text-sm md:text-4xl`}></i> */}
                                <span data-info={item.id} className='text-sm mt-1.5'>{item.name}</span>
                            </Link>

                        </li>
                    )
                })
            }
        </ul>
    )
});

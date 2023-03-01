/**
 * 
 * @param callback 
 * @param targetNode 
 */
export default function UseMutationObserver(callback: (targetNode: HTMLElement) => void, targetNode: HTMLElement) {
  // 选择需要观察变动的节点
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true };
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(() => callback(targetNode));
  // 以上述配置开始观察目标节点

  observer.observe(targetNode, config);
  setTimeout(() => {
    // 5秒之后，自动可停止观察
    observer.disconnect();
    //@ts-ignore
    callback = null;
  }, 5000);
}
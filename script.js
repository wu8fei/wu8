// 复制QQ群号功能实现
document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyButton');
    const copyAddressButton = document.getElementById('copyAddressButton');
    const groupNumber = document.getElementById('groupNumber');
    const serverAddress = document.getElementById('serverAddress');
    const toast = document.getElementById('toast');
    
    // 通用复制函数
    function copyText(element, button) {
        // 创建临时文本区域
        const tempInput = document.createElement('input');
        tempInput.value = element.textContent;
        document.body.appendChild(tempInput);
        
        // 选择并复制文本
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // 兼容移动设备
        
        try {
            // 执行复制命令
            const successful = document.execCommand('copy');
            
            if (successful) {
                // 显示复制成功提示
                showToast();
                
                // 更改按钮状态为已复制
                button.classList.add('copied');
                button.innerHTML = '<i class="fas fa-check"></i><span class="copy-text">已复制</span>';
                
                // 2秒后恢复按钮原始状态
                setTimeout(function() {
                    button.classList.remove('copied');
                    button.innerHTML = '<i class="fas fa-copy"></i><span class="copy-text">复制</span>';
                }, 2000);
            } else {
                console.error('复制失败');
            }
        } catch (err) {
            console.error('复制操作出错:', err);
        }
        
        // 移除临时文本区域
        document.body.removeChild(tempInput);
    }
    
    // QQ群号复制按钮点击事件
    copyButton.addEventListener('click', function() {
        copyText(groupNumber, copyButton);
    });
    
    // 服务器地址复制按钮点击事件
    copyAddressButton.addEventListener('click', function() {
        copyText(serverAddress, copyAddressButton);
    });
    
    // 显示提示框函数
    function showToast() {
        toast.classList.add('show');
        
        // 2秒后隐藏提示框
        setTimeout(function() {
            toast.classList.remove('show');
        }, 2000);
    }
    
    // 添加键盘快捷键支持 (可选)
    document.addEventListener('keydown', function(e) {
        // Ctrl+C 或 Cmd+C 也可以复制群号或地址
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            if (document.activeElement === copyButton || copyButton.contains(document.activeElement)) {
                e.preventDefault();
                copyButton.click();
            } else if (document.activeElement === copyAddressButton || copyAddressButton.contains(document.activeElement)) {
                e.preventDefault();
                copyAddressButton.click();
            }
        }
    });
    
    // 添加无障碍支持 (可选)
    [copyButton, copyAddressButton].forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        // 支持键盘操作
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
});
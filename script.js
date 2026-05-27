// 复制QQ群号功能实现
document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyButton');
    const copyAddressButton = document.getElementById('copyAddressButton');
    const groupNumber = document.getElementById('groupNumber');
    const serverAddress = document.getElementById('serverAddress');
    const toast = document.getElementById('toast');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    // 评论相关元素
    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');
    const usernameInput = document.getElementById('username');
    const commentInput = document.getElementById('comment');
    
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
    
    // 图片预览功能
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            imageModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
        
        // 添加无障碍支持
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.setAttribute('aria-label', '查看大图: ' + (this.alt || '服务器截图'));
        
        // 支持键盘操作
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    });
    
    // 点击模态框外部关闭
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 初始化评论区
    initComments();
    
    // 加载评论函数
    function initComments() {
        // 模拟从服务器加载评论
        // 在实际应用中，这里应该是一个AJAX请求
        setTimeout(function() {
            // 模拟从chathistory.txt读取数据
            const mockComments = loadMockComments();
            displayComments(mockComments);
        }, 500);
    }
    
    // 模拟从chathistory.txt加载评论数据
    function loadMockComments() {
        // 这里是模拟数据，实际应用中应该通过AJAX请求获取
        const comments = [
            {
                timestamp: '2023-10-20 14:30:25',
                username: '史蒂夫',
                content: '服务器很不错，暮色森林的氛围营造得很好！'
            },
            {
                timestamp: '2023-10-20 15:45:12',
                username: '爱丽克斯',
                content: '机械火车站的设计太赞了，很有创意！'
            },
            {
                timestamp: '2023-10-21 09:15:33',
                username: '苦力怕',
                content: '服务器延迟低，游戏体验很流畅'
            },
            {
                timestamp: '2023-10-21 16:22:47',
                username: '末影人',
                content: '管理员很热情，解答问题很耐心'
            },
            {
                timestamp: '2023-10-22 11:05:19',
                username: '铁傀儡',
                content: '希望能增加更多有趣的模组'
            }
        ];
        
        return comments;
    }
    
    // 显示评论
    function displayComments(comments) {
        commentsList.innerHTML = '';
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">暂无评论，快来发表第一条评论吧！</div>';
            return;
        }
        
        // 按时间倒序排列（最新的在前面）
        comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="comment-username">${escapeHtml(comment.username)}</span>
                    <span class="comment-time">${comment.timestamp}</span>
                </div>
                <div class="comment-content">${escapeHtml(comment.content)}</div>
            `;
            
            commentsList.appendChild(commentElement);
        });
    }
    
    // 提交评论表单事件
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const content = commentInput.value.trim();
        
        if (!username || !content) {
            showCommentStatus('请填写完整的用户名和评论内容', 'error');
            return;
        }
        
        // 模拟提交评论
        submitComment(username, content);
    });
    
    // 提交评论函数
    function submitComment(username, content) {
        // 禁用提交按钮，防止重复提交
        const submitBtn = commentForm.querySelector('.submit-comment-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 获取当前时间
            const now = new Date();
            const timestamp = formatDateTime(now);
            
            // 创建新评论对象
            const newComment = {
                timestamp: timestamp,
                username: username,
                content: content
            };
            
            // 模拟将评论保存到chathistory.txt
            // 在实际应用中，这里应该是一个AJAX请求
            console.log('保存评论到chathistory.txt:', newComment);
            
            // 重新加载评论列表
            const comments = loadMockComments();
            comments.push(newComment);
            displayComments(comments);
            
            // 清空表单
            commentForm.reset();
            
            // 恢复提交按钮
            submitBtn.disabled = false;
            submitBtn.textContent = '提交评论';
            
            // 显示成功消息
            showCommentStatus('评论提交成功！', 'success');
            
            // 滚动到新评论
            commentsList.scrollTop = 0;
        }, 800);
    }
    
    // 显示评论状态消息
    function showCommentStatus(message, type) {
        // 移除已有的状态消息
        const existingStatus = document.querySelector('.comment-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // 创建新的状态消息
        const statusElement = document.createElement('div');
        statusElement.className = `comment-status ${type}`;
        statusElement.textContent = message;
        
        // 添加到表单后面
        commentForm.appendChild(statusElement);
        
        // 3秒后自动移除
        setTimeout(function() {
            if (statusElement.parentNode) {
                statusElement.remove();
            }
        }, 3000);
    }
    
    // 格式化日期时间
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    // HTML转义函数，防止XSS攻击
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

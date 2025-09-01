// DOM読み込み完了後の処理
document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオン機能
    initFAQ();
    
    // スムーススクロール
    initSmoothScroll();
    
    // スクロールアニメーション
    initScrollAnimation();
    
    // CTAボタンのイベント
    initCTAButtons();

    // カウントダウン
    initCountdown();
    
    // 残り枠数のカウントダウン
    initRemainingSlots();
    
    // カルーセル機能
    initCarousel();
    
    // SNSシェア機能
    initShareButtons();
});

// FAQアコーディオン機能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 他のFAQアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 現在のアイテムの状態を切り替え
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// スムーススクロール機能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // ヘッダーの高さ分を調整
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// スクロールアニメーション
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.problem-card, .solution-feature, .timeline-item, .testimonial-card, .pricing-card');
    
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// CTAボタンのイベント
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンのテキストに応じて処理を分岐
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('無料体験')) {
                handleFreeTrial();
            } else if (buttonText.includes('購入')) {
                handlePurchase();
            } else if (buttonText.includes('相談')) {
                handleConsultation();
            }
        });
    });
}

// 無料体験の処理
function handleFreeTrial() {
    // モーダル表示やフォーム送信などの処理
    showModal('無料体験申し込み', `
        <p>無料体験のお申し込みを受け付けました。</p>
        <p>24時間以内にメールで詳細をお送りいたします。</p>
        <div class="modal-form">
            <input type="email" placeholder="メールアドレス" required>
            <button class="btn btn-primary">送信</button>
        </div>
    `);
}

// 購入の処理
function handlePurchase() {
    // 購入ページへのリダイレクトや決済処理
    showModal('購入確認', `
        <p>AI Udemy講座作成マスターコースの購入を確認してください。</p>
        <div class="purchase-summary">
            <p><strong>料金:</strong> ¥29,800（税込）</p>
            <p><strong>内容:</strong> 3日間の完全カリキュラム + 特典</p>
        </div>
        <div class="modal-actions">
            <button class="btn btn-primary">購入を確定する</button>
            <button class="btn btn-secondary modal-close">キャンセル</button>
        </div>
    `);
}

// 相談の処理
function handleConsultation() {
    // 相談フォームの表示
    showModal('無料相談申し込み', `
        <p>無料相談のお申し込みを受け付けました。</p>
        <p>専門スタッフが丁寧にご対応いたします。</p>
        <div class="modal-form">
            <input type="text" placeholder="お名前" required>
            <input type="email" placeholder="メールアドレス" required>
            <textarea placeholder="ご相談内容" rows="4" required></textarea>
            <button class="btn btn-primary">送信</button>
        </div>
    `);
}

// モーダル表示
function showModal(title, content) {
    // 既存のモーダルを削除
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // モーダル要素を作成
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // モーダルを表示
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // モーダルを閉じる処理
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    // 閉じるボタンのイベント
    modal.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // オーバーレイクリックで閉じる
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// スクロール位置に応じたヘッダーの表示/非表示
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下スクロール時はヘッダーを隠す
        document.body.classList.add('header-hidden');
    } else {
        // 上スクロール時はヘッダーを表示
        document.body.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
});

// ページ読み込み完了後の追加処理
window.addEventListener('load', function() {
    // ローディングアニメーション
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // 統計数字のカウントアップアニメーション
    animateNumbers();
});

// 統計数字のカウントアップアニメーション
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number');
    
    numberElements.forEach(element => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2秒
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // 数値のフォーマット
            if (element.textContent.includes('¥')) {
                element.textContent = '¥' + Math.floor(current).toLocaleString();
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// フォーム送信の処理
function handleFormSubmit(formData) {
    // 実際の実装では、サーバーへの送信処理を行う
    console.log('フォームデータ:', formData);
    
    // 成功メッセージの表示
    showSuccessMessage('お申し込みを受け付けました。ありがとうございます！');
}

// 成功メッセージの表示
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // 3秒後に自動で消す
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// カウントダウン（価格の期間限定表示）
function initCountdown() {
    const deadline = new Date();
    // 72時間後をデフォルト期限に設定
    deadline.setHours(deadline.getHours() + 72);
    const ids = { d: 'cd-days', h: 'cd-hours', m: 'cd-minutes', s: 'cd-seconds' };

    function update() {
        const now = new Date();
        const diff = Math.max(0, deadline - now);
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const m = Math.floor(diff / (1000 * 60)) % 60;
        const s = Math.floor(diff / 1000) % 60;
        if (document.getElementById(ids.d)) document.getElementById(ids.d).textContent = String(d).padStart(2, '0');
        if (document.getElementById(ids.h)) document.getElementById(ids.h).textContent = String(h).padStart(2, '0');
        if (document.getElementById(ids.m)) document.getElementById(ids.m).textContent = String(m).padStart(2, '0');
        if (document.getElementById(ids.s)) document.getElementById(ids.s).textContent = String(s).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}

// 残り枠数カウントダウン（購買プレッシャー演出）
function initRemainingSlots() {
    const stickyRemaining = document.getElementById('sticky-remaining');
    if (!stickyRemaining) return;
    
    let remaining = 23; // 初期値
    const minRemaining = 8; // 最小値
    
    function decreaseSlots() {
        if (remaining > minRemaining) {
            remaining--;
            stickyRemaining.textContent = remaining;
            // 残り枠が少なくなったら色を変更
            if (remaining <= 15) {
                stickyRemaining.style.color = '#F59E0B';
                stickyRemaining.style.fontWeight = '700';
            }
            if (remaining <= 10) {
                stickyRemaining.style.color = '#EF4444';
                stickyRemaining.parentElement.style.animation = 'pulse 1.5s infinite';
            }
        }
    }
    
    // 不規則な間隔で減らす（5-15分間隔）
    function scheduleNext() {
        const delay = (Math.random() * 10 + 5) * 60 * 1000; // 5-15分
        setTimeout(() => {
            decreaseSlots();
            scheduleNext();
        }, delay);
    }
    
    scheduleNext();
}

// カルーセル機能
function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // グローバル関数として公開
    window.changeSlide = function(direction) {
        showSlide(currentSlide + direction);
    };
    
    window.currentSlide = function(n) {
        showSlide(n - 1);
    };
    
    // 自動スライド（5秒間隔）
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// SNSシェア機能
function initShareButtons() {
    const shareText = "AIで7日間！Udemy講座を完成。60日間伴走で収益化へ → ";
    const shareUrl = window.location.href;
    
    window.shareToTwitter = function() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.shareToFacebook = function() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.shareToLinkedIn = function() {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.shareToInstagram = function() {
        // Instagramは直接シェアできないため、コピー機能を提供
        const textToCopy = shareText + shareUrl;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showSuccessMessage('シェア用テキストをクリップボードにコピーしました！Instagramに貼り付けてください。');
        });
    };
}

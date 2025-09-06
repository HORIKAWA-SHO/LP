// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(248, 232, 240, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #f8e8f0 0%, #fdf2f8 100%)';
        header.style.backdropFilter = 'none';
    }
});

// フォーム送信処理
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // フォームデータを取得
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 簡単なバリデーション
    if (!data.name || !data.email || !data.service || !data.date) {
        alert('必須項目をすべて入力してください。');
        return;
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 成功メッセージを表示
    alert('ご予約のお申し込みありがとうございます。\n24時間以内にご連絡いたします。');
    
    // フォームをリセット
    this.reset();
});

// アニメーション効果（Intersection Observer）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を設定
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .staff-card, .blog-card, .gallery-item, .problem-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ギャラリーの画像クリック効果
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');
        
        // モーダル風の効果（簡易版）
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // クリックで閉じる
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    });
});

// 料金カードのホバー効果強化
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// SNSリンクのクリック効果
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const platform = this.classList.contains('instagram') ? 'Instagram' : 
                        this.classList.contains('twitter') ? 'Twitter' : 'LINE';
        
        alert(`${platform}のページは準備中です。\nしばらくお待ちください。`);
    });
});

// ページ読み込み時のアニメーション
window.addEventListener('load', function() {
    const hero = document.querySelector('.hero-content');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 300);
});

// レスポンシブメニュー（モバイル用）
function createMobileMenu() {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            const menuButton = document.createElement('button');
            menuButton.className = 'mobile-menu-button';
            menuButton.innerHTML = '☰';
            menuButton.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #d946ef;
                cursor: pointer;
                display: block;
            `;
            
            header.appendChild(menuButton);
            
            menuButton.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'white';
                nav.style.flexDirection = 'column';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        }
    }
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', createMobileMenu);
createMobileMenu();

        // Thời gian tối thiểu hiển thị loading screen
        const minLoadingTime = 1300; 
        const loadingStartTime = Date.now();

        function hideLoadingScreen() {
            const loadingScreen = document.querySelector('.loading-screen');
            const remainingTime = minLoadingTime - (Date.now() - loadingStartTime);

            if(remainingTime > 0) {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, remainingTime);
            } else {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }

        window.addEventListener('load', () => {
            hideLoadingScreen();
        });

        setTimeout(hideLoadingScreen, 5000);

        document.addEventListener("DOMContentLoaded", function () {
            const articles = document.querySelectorAll(".recommended-article");
            const observer = new IntersectionObserver(
              entries => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                  }
                });
              },
              { threshold: 0.1 }
            );
          
            articles.forEach(article => {
              observer.observe(article);
            });
          });
                   
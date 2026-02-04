document.addEventListener('DOMContentLoaded', function() {
    const newsArticles = [
        {
            id: 1,
            title: "Arsenal vs Manchester United: Đại chiến định đoạt ngôi vương",
            summary: "Trận đấu giữa Arsenal và Manchester United tại sân Emirates hứa hẹn sẽ là cuộc đối đầu nảy lửa, có thể quyết định ngôi vô địch Premier League mùa giải này. Cả hai đội đều đang có phong độ cao và sẵn sàng chiến đấu hết mình.",
            image: "https://media.bongda.com.vn/files/trung.nguyen/2022/01/29/man-city-1130.jpg",
            date: "2025-09-09",
            category: "Tin tức trận đấu"
        },
        {
            id: 2,
            title: "Haaland trở lại sau chấn thương, Man City thở phào nhẹ nhõm",
            summary: "Tiền đạo chủ lực Erling Haaland đã trở lại tập luyện cùng toàn đội sau khi hồi phục chấn thương. Sự trở lại của anh là tin vui lớn cho Manchester City trong bối cảnh lịch thi đấu dày đặc sắp tới.",
            image: "https://media.bongda.com.vn/files/trung.nguyen/2022/01/29/man-city-1130.jpg",
            date: "2025-09-08",
            category: "Tin cầu thủ"
        },
        {
            id: 3,
            title: "Liverpool chính thức ra mắt tân binh trẻ tuổi tiềm năng",
            summary: "Liverpool vừa hoàn tất thương vụ chiêu mộ một tài năng trẻ sáng giá từ Nam Mỹ. Ban huấn luyện đội bóng kỳ vọng cầu thủ này sẽ là 'viên ngọc' quý giá trong tương lai của câu lạc bộ.",
            image: "https://media.bongda.com.vn/files/trung.nguyen/2022/01/29/man-city-1130.jpg",
            date: "2025-09-07",
            category: "Chuyển nhượng"
        },
        {
            id: 4,
            title: "Chelsea thắng lớn, Cole Palmer tỏa sáng rực rỡ",
            summary: "Trong trận đấu gần nhất, Chelsea đã giành chiến thắng thuyết phục với sự góp công lớn của tiền vệ trẻ Cole Palmer. Anh là người ghi bàn quyết định và được đánh giá là Cầu thủ xuất sắc nhất trận.",
            image: "https://media.bongda.com.vn/files/trung.nguyen/2022/01/29/man-city-1130.jpg",
            date: "2025-09-06",
            category: "Tin tức trận đấu"
        }
    ];

    const newsRow = document.getElementById('news-row');

    if (newsRow) {
        newsArticles.forEach(article => {
            const articleHTML = `
                <div class="col-md-6 col-lg-4">
                    <div class="card news-card h-100 shadow-lg border-0 rounded-4">
                        <img src="${article.image}" class="card-img-top news-card-image" alt="${article.title}">
                        <div class="card-body d-flex flex-column">
                            <span class="news-category badge bg-secondary text-white mb-2">${article.category}</span>
                            <h5 class="card-title news-card-title">${article.title}</h5>
                            <p class="card-text news-card-text">${article.summary}</p>
                            <p class="news-date mt-auto text-end text-muted">
                                <small>Đăng ngày: ${article.date}</small>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            newsRow.innerHTML += articleHTML;
        });
    }
});
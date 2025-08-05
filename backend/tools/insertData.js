require("dotenv").config();
const mongoose = require("mongoose");
const TheLoai = require("../app/models/TheLoai");
const NhaXuatBan = require("../app/models/NhaXuatBan");
const config = require("../app/config");
const Sach = require("../app/models/Sach")

// const data = [
//   { tenTheLoai: "Văn học nước ngoài", moTa: "" },
//   { tenTheLoai: "Phiêu lưu", moTa: "" },
// ];
// const data = [
//     { "tenTheLoai": "Cách mạng", "moTa": "" },
//     { "tenTheLoai": "Giáo dục", "moTa": "" },
//     { "tenTheLoai": "Khoa học", "moTa": "" },
//     { "tenTheLoai": "Kỹ năng sống", "moTa": "" },
//     { "tenTheLoai": "Văn học thiếu nhi", "moTa": "" },
//     { "tenTheLoai": "Tiểu thuyết", "moTa": "" },
//     { "tenTheLoai": "Lãng mạn", "moTa": "" },
//     { "tenTheLoai": "Triết học", "moTa": "" },
//     { "tenTheLoai": "Truyền cảm hứng", "moTa": "" },
//     { "tenTheLoai": "Tâm linh", "moTa": "" },
//     { "tenTheLoai": "Tâm lý", "moTa": "" },
//     { "tenTheLoai": "Tự truyện", "moTa": "" },
//     { "tenTheLoai": "Văn học Việt Nam", "moTa": "" },
//   ];

// const data =[
//     {
//       "tenNhaXuatBan": "NXB Kim Đồng",
//       "namThanhLap": 1957,
//       "email": "cskh_online@nxbkimdong.com.vn",
//       "soDienThoai": "1900571595",
//       "website": "https://nxbkimdong.com.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Trẻ",
//       "namThanhLap": 1981,
//       "email": "info@nxbtree.vn",
//       "soDienThoai": "02839320068",
//       "website": "https://nxbtre.com.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Hội Nhà Văn",
//       "namThanhLap": 1957,
//       "email": "contact@hoinhavan.vn",
//       "soDienThoai": "02439450000",
//       "website": "http://hoinhavan.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Lao Động",
//       "namThanhLap": 1945,
//       "email": "nxbld@laodong.vn",
//       "soDienThoai": "02435143621",
//       "website": "http://nxblaodong.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Thế Giới",
//       "namThanhLap": 1957,
//       "email": "info@thegioipublishing.vn",
//       "soDienThoai": "02438226456",
//       "website": "https://thegioipublish.com.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Tổng hợp TP.HCM",
//       "namThanhLap": 1977,
//       "email": "contact@nxbtphcm.vn",
//       "soDienThoai": "02839302820",
//       "website": "https://nxbtphcm.com.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Văn hóa Thông tin",
//       "namThanhLap": 1954,
//       "email": "info@vanhoathongtin.vn",
//       "soDienThoai": "02438252439",
//       "website": "http://vanhoathongtin.vn"
//     },
//     {
//       "tenNhaXuatBan": "NXB Văn học",
//       "namThanhLap": 1957,
//       "email": "contact@vanhoc.vn",
//       "soDienThoai": "02439424535",
//       "website": "https://nxbvanhoc.com.vn"
//     }
//   ]

const data = [
  {
    tenSach: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    tacGia: "Rosie Nguyễn",
    nhaXuatBan: "688f41df9c2aeb3597130e3c",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f94f" },
      { theLoai: "688f4008949e74faa4e0f954" },
    ],
    ngayXuatBan: "2018-04-01",
    donGia: 82000,
    anhBia: ["/public/uploads/covers/tuoitredanggiabaonhieu1.jpg"],
    soTrang: 292,
    soLuongTon: 10,
    moTa: 'Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ.\n\nBạn trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng.\n\nBạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ.\n\nSuy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn.\n\nNên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống.\nVì sau tất cả, chẳng ai quan tâm.\n"Tôi đã đọc quyển sách này một cách thích thú. Có nhiều kiến thức và kinh nghiệm hữu ích, những điều mới mẻ ngay cả với người gần trung niên như tôi.\nTuổi trẻ đáng giá bao nhiêu? được tác giả chia làm 3 phần: HỌC, LÀM, ĐI.\nNhưng tôi thấy cuốn sách còn thể hiện một phần thứ tư nữa, đó là ĐỌC.\nHãy đọc sách, nếu bạn đọc sách một cách bền bỉ, sẽ đến lúc bạn bị thôi thúc không ngừng bởi ý muốn viết nên cuốn sách của riêng mình.\nNếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? nhiều hơn một lần."\n- Đặng Nguyễn Đông Vy, tác giả, nhà báo',
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Đắc Nhân Tâm",
    tacGia: "Dale Carnegie",
    nhaXuatBan: "688f41df9c2aeb3597130e3f",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f94f" },
      { theLoai: "688f4008949e74faa4e0f956" },
    ],
    ngayXuatBan: "2017-01-01",
    donGia: 99000,
    anhBia: ["/public/uploads/covers/dacnhantam1.jpg"],
    soTrang: 319,
    soLuongTon: 20,
    moTa: "Đắc nhân tâm của Dale Carnegie là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, tính đến nay, sách đã được dịch ra ở hầu hết các ngôn ngữ, trong đó có cả Việt Nam, và đã nhận được sự đón tiếp nhiệt tình của đọc giả ở hầu hết các quốc gia.\n\nLà quyển sách đầu tiên có ảnh hưởng làm thay đổi cuộc đời của hàng triệu người trên thế giới, Đắc Nhân Tâm là cuốn sách đem lại những giá trị tuyệt vời cho người đọc, bao gồm những lời khuyên cực kì bổ ích về cách ứng xử trong cuộc sống hàng ngày. Sức lan toả của quyển sách vô cùng rộng lớn – với nhiều tầng lớp, đối tượng.\n\nĐắc Nhân Tâm không chỉ là là nghệ thuật thu phục lòng người, Đắc Nhân Tâm còn đem lại cho độc giả góc nhìn, suy nghĩ sâu sắc về việc giao tiếp ứng xử.\n\nTriết lý của Đắc Nhân Tâm là hiểu mình, thành thật với chính mình, từ đó hiểu biết và quan tâm đến những người xung quanh để nhìn ra và khơi gợi những tiềm năng ẩn khuất nơi họ, giúp họ phát triển lên một tầm cao mới. Đây chính là nghệ thuật cao nhất về con người và chính là ý nghĩa sâu sắc nhất đúc kết từ những nguyên tắc vàng của Dale Carnegie.",
    quocGia: "Mỹ",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Nhà Giả Kim",
    tacGia: "Paulo Coelho",
    nhaXuatBan: "688f41df9c2aeb3597130e41",
    theLoais: [
      { theLoai: "6890b8d9af235f5f69c21c15" },
      { theLoai: "6890b8d9af235f5f69c21c16" },
    ],
    ngayXuatBan: "2020-09-01",
    donGia: 79000,
    anhBia: ["/public/uploads/covers/nhagiakim1.jpg"],
    soTrang: 228,
    soLuongTon: 15,
    moTa: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.\n\nTiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.\n\n\"Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. \'Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,\' ông nghĩ.\"\n- Trích Nhà giả kim",
    quocGia: "Brazil",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Không Gia Đình",
    tacGia: "Hector Malot",
    nhaXuatBan: "688f41df9c2aeb3597130e3a",
    theLoais: [
      { theLoai: "6890b8d9af235f5f69c21c15" },
      { theLoai: "688f4008949e74faa4e0f950" },
    ],
    ngayXuatBan: "2021-05-01",
    donGia: 112000,
    anhBia: ["/public/uploads/covers/khonggiadinh1.jpg"],
    soTrang: 574,
    soLuongTon: 12,
    moTa: "Không gia đình là tác phẩm văn học thiếu nhi nổi tiếng của nhà văn Pháp: Hector Malot. Không gia đình đã giành được giải thưởng của Viện Hàn lâm Pháp và tác phẩm đã vượt qua biên giới nước Pháp để đến với lứa tuổi thiếu nhi ở khắp năm châu. Cùng với thời gian Không gia đình luôn hấp dẫn mọi thế hệ tuổi thơ cũng như người lớn bởi tính nhân văn cao cả, vẽ đẹp lãng mạn và bút pháp tinh tế điêu luyện.\n\nVới mong muốn có thêm một cách tiếp cận tác phẩm nổi tiếng này, Nhà xuất bản Văn học cho ấn hành Không gia đình của dịch giả Phạm Văn Vĩnh. Hy vọng bản dịch mới này cùng với bản dịch của các dịch giả trước đây sẽ làm cho các em thiếu nhi càng thêm yêu mến tác phẩm với hình ảnh những con người tuyệt đẹp. Thủy chung, quả cảm, yêu lao động, yêu nghệ thuật, biết tôn trọng phẩm giá và danh dự, sẵn sàng giúp đỡ mọi người.",
    quocGia: "Pháp",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Totto-Chan Bên Cửa Sổ",
    tacGia: "Kuroyanagi Tetsuko",
    nhaXuatBan: "688f41df9c2aeb3597130e41",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f950" },
      { theLoai: "688f4008949e74faa4e0f957" },
    ],
    ngayXuatBan: "2020-03-10",
    donGia: 88000,
    anhBia: ["/public/uploads/covers/totto-chanbencuaso1.jpg"],
    soTrang: 355,
    soLuongTon: 9,
    moTa: "Vừa vào lớp một được vài ngày, Totto-chan đã bị đuổi học!!!\n\nKhông còn cách nào khác, mẹ đành đưa Totto-chan đến một ngôi trường mới, trường Tomoe. Đấy là một ngôi trường kỳ lạ, lớp học thì ở trong toa xe điện cũ, học sinh thì được thoả thích thay đổi chỗ ngồi mỗi ngày, muốn học môn nào trước cũng được, chẳng những thế, khi đã học hết bài, các bạn còn được cô giáo cho đi dạo. Đặc biệt hơn ở đó còn có một thầy hiệu trưởng có thể chăm chú lắng nghe Totto-chan kể chuyện suốt bốn tiếng đồng hồ! Chính nhờ ngôi trường đó, một Totto-chan hiếu động, cá biệt đã thu nhận được những điều vô cùng quý giá để lớn lên thành một con người hoàn thiện, mạnh mẽ.\n\nTotto-chan bên cửa sổ là cuốn sách gối đầu giường của nhiều thế hệ trẻ em trên toàn thế giới suốt ba mươi năm nay. Sau khi xuất bản lần đầu vào năm 1981, cuốn sách đã gây được tiếng vang lớn không chỉ ở Nhật Bản mà còn trên toàn thế giới. Tính đến năm 2001, tổng số bản sách bán ra ở Nhật đã lên đến 9,3 triệu bản, trở thành một trong những cuốn sách bán chạy nhất trong lịch sử ngành xuất bản nước này. Cuốn sách đã được dịch ra 33 thứ tiếng khác nhau, như Anh, Pháp, Đức, Hàn Quốc, Trung Quốc…Khi bản tiếng Anh của Totto-chan được xuất bản tại Mỹ, tờ New York Times đã đăng liền hai bài giới thiệu trọn trang, một “vinh dự” hầu như không tác phẩm nào có được.",
    quocGia: "Nhật Bản",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Thép Đã Tôi Thế Đấy",
    tacGia: "Nikolai A. Ostrovsky",
    nhaXuatBan: "688f41df9c2aeb3597130e41",
    theLoais: [
      { theLoai: "6890b8d9af235f5f69c21c15" },
      { theLoai: "688f4008949e74faa4e0f94c" },
    ],
    ngayXuatBan: "2018-08-15",
    donGia: 92000,
    anhBia: ["/public/uploads/covers/thepdatoitheday1.jpg"],
    soTrang: 636,
    soLuongTon: 13,
    moTa: '"Thép đã tôi thế đấy" là cuốn tiểu thuyết do Nikolai Alexeevich Ostrovsky viết trong thời kỳ Stalin. Cuốn tiểu thuyết đã được dịch ra 70 thứ tiếng và in ra ở hơn 80 nước, trong đó có Việt Nam.\n\nThép Đã Tôi Thế Đấy là một khúc ca tươi đẹp của đời sống. Mỗi trang sách như cuốn thêm máu chảy trong người đọc, nâng cao thêm nhiệt tình cách mạng, thúc giục chiến đấu, thúc giục công tác.\n\nThép Đã Tôi Thế Đấy đã một thời được coi là cuốn sách gối đầu giường của bao thế hệ thanh niên Việt Nam. Nhân vật Pa -ven là một hình ảnh điển hình sâu sắc và là sự thể hiện trong sáng bằng nghệ thuật lịch sử của người thanh niên Xô Viết, sự thể hiện những phẩm chất chính trị, tinh thần cao quý, lòng trung thành sâu xa của người thanh niên Xô Viết đối với Đảng, Tổ quốc, nhân dân. Sức mạnh và tính hấp dẫn của hình ảnh Pa -ven chính là ở chỗ trong con người Pa -ven đã tổng hợp được những phẩm chất tốt đẹp nhất và điển hình nhất của thanh niên Xô Viết thời ấy.',
    quocGia: "Nga",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Bí Mật Của Nước",
    tacGia: "Masaru Emoto",
    nhaXuatBan: "688f41df9c2aeb3597130e3d",
    theLoais: [{ theLoai: "688f4008949e74faa4e0f94e" }],
    ngayXuatBan: "2019-09-20",
    donGia: 105000,
    anhBia: ["/public/uploads/covers/bimatcuanuoc1.jpg"],
    soTrang: 232,
    soLuongTon: 11,
    moTa: 'Sự tồn tại của nước là một lý do quan trọng làm trái đất trở nên khác biệt, biến nó thành 1 hành tinh xanh nơi mà sự sống hiện hữu và sinh sôi. Con người tiếp xúc với nước mỗi ngày để duy trì các hoạt động sống nhưng lại biết quá ít về nó, thậm chí mơ hồ và lãng quên về những đều kỳ diệu mà nước đã đang và sẽ mang lại cho họ.\n\nNhững mối bận tâm với công việc, những sở thích cá nhân, các mối quan hệ xã hội xâm chiếm hầu hết quỹ thời gian của mỗi người. Và do vô tình hay cố ý, ta quên đi cách trân trọng và cảm nhận sâu sắc về những món quà bình dị mà mẹ thiên nhiên trao tặng. Bí mật của nước là cuộc phiêu lưu để tìm hiểu và khám phá về nước - khởi nguồn của vạn vật - và cũng là một chuyến du hành nhỏ để đánh thức những xúc cảm đẹp bị vùi lấp bởi những lo toan thường ngày.\n\nCuốn sách mở đầu với những tần số hạnh phúc và sự cộng hưởng để cấu thành các tinh thể nước trong mối tương quan với sự hình thành nên các cảm xúc tích cực hay tiêu cực trong mỗi người:\n\n"Cuộc tìm kiếm hạnh phúc cuối cùng và cơ bản chính là cuộc tìm kiếm bản ngã. Bạn có thể đi tìm nó ở những vùng đất xa xôi, nhưng bạn sẽ chỉ tìm thấy nó trong lòng bàn tay mình mà thôi. Nếu bạn nghĩ lại về cuộc đời mình đủ xa, rất có thể bạn sẽ nhớ tới lúc mà bạn bảm thấy một niềm hạnh phúc thật vô tư. Cuộc đời của bạn có ý nghĩa và bạn bận rộn sống tới nỗi giây phút đó đã bị lãng quên. Tuổi trưởng thành ào tới, bạn cất những thứ đó đi và khóa cửa lại. Có lẽ thậm chí bạn đã quên cả nơi mình cất chìa khóa. Nhưng những cảm giác hạnh phúc đó không biến mất vĩnh viễn. Với một chút nỗ lực, bạn có thể mở cánh cửa và lấy ra những thứ mà bạn đã tưởng mãi mãi chỉ là một phần của quá khứ. Khi bạn thành thật với bản thân và tìm kiếm điều bạn thực sự muốn trở thành và thực hiện, cuộc đời bạn sẽ lại một lần nữa tuôn chảy." (Masura Emoto)\n\nVà cứ như vậy, bằng sự tinh tế của mình, tác giả đặt nước vào những góc độ khác nhau để làm bật lên những phép thử, những sự so sánh, những liên tưởng gần với cuộc sống muôn màu của con người. Cứ thế, lần theo mỗi trang sách mà những cảm xúc ngủ quên bấy lâu trong ta như bừng tỉnh…\n\nCó lẽ, đó cũng chính là lí do tại sao cuốn sách này đã tạo nên một làn sóng mạnh mẽ lan tỏa trên khắp thế giới - một sự cộng hưởng tuyệt đẹp của những niềm hân hoan và sự gắn kết. "Nước có một đời sống bí ẩn. Nó chỉ cho ta biết làm thế nào để tìm ra hạnh phúc. Nó tiết lộ ý nghĩa của tình yêu dành cho thiên nhiên. Nó chỉ cho chúng ta con đường mà nhân loại đã đi qua để trả lời những câu hỏi mà ta hằng trăn trở." (Masura Emoto)',
    quocGia: "Nhật Bản",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Đi Tìm Lẽ Sống",
    tacGia: "Viktor E. Frankl",
    nhaXuatBan: "688f41df9c2aeb3597130e3f",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f956" },
      { theLoai: "688f4008949e74faa4e0f954" },
    ],
    ngayXuatBan: "2016-11-10",
    donGia: 115000,
    anhBia: ["/public/uploads/covers/ditimlesong1.jpg"],
    soTrang: 220,
    soLuongTon: 10,
    moTa: 'Trước hết, đây là quyển sách viết về sự sinh tồn. Giống như nhiều người Do Thái sinh sống tại Đức và Đông Âu khi ấy, vốn nghĩ rằng mình sẽ được an toàn trong những năm 1930, Frankl đã trải qua khoảng thời gian chịu nhiều nghiệt ngã trong trại tập trung và trại hủy diệt của Đức quốc xã. Điều kỳ diệu là ông đã sống sót, cụm từ “thép đã tôi thế đấy” có thể lột tả chính xác trường hợp này. Nhưng trong Người đi tìm lẽ sống, tác giả ít đề cập đến những khó nhọc, đau thương, mất mát mà ông đã trải qua, thay vào đó ông viết về những nguồn sức mạnh đã giúp ông tồn tại. Ông chua xót kể về những tù nhân đã đầu hàng cuộc sống, mất hết hy vọng ở tương lai và chắc hẳn là những người đầu tiên sẽ chết. Ít người chết vì thiếu thức ăn và thuốc men, mà phần lớn họ chết vì thiếu hy vọng, thiếu một lẽ sống. Ngược lại, Frankl đã nuôi giữ hy vọng để giữ cho mình sống sót bằng cách nghĩ về người vợ của mình và trông chờ ngày gặp lại nàng. Ông còn mơ ước sau chiến tranh sẽ được thuyết giảng về các bài học tâm lý ông đã học được từ trại tập trung Auschwitz. Rõ ràng có nhiều tù nhân khao khát được sống đã chết, một số chết vì bệnh, một số chết vì bị hỏa thiêu. Trong tập sách này, Frankl tập trung lý giải nguyên nhân vì sao có những người đã sống sót trong trại tập trung của phát xít Đức hơn là đưa ra lời giải thích cho câu hỏi vì sao phần lớn trong số họ đã không bao giờ trở về nữa.\n\nNhiệm vụ lớn lao nhất của mỗi người là tìm ra ý nghĩa trong cuộc sống của mình. Frankl đã nhìn thấy ba nguồn ý nghĩa cơ bản của đời người: thành tựu trong công việc, sự quan tâm chăm sóc đối với những người thân yêu và lòng can đảm khi đối mặt với những thời khắc gay go của cuộc sống. Đau khổ tự bản thân nó không có ý nghĩa gì cả, chính cách phản ứng của chúng ta mới khoác lên cho chúng ý nghĩa. Frankl đã viết rằng một người “có thể giữ vững lòng quả cảm, phẩm giá và sự bao dung, hoặc người ấy có thể quên mất phẩm giá của con người và tự đặt mình ngang hàng loài cầm thú trong cuộc đấu tranh khắc nghiệt để sinh tồn”. Ông thừa nhận rằng chỉ có một số ít tù nhân của Đức quốc xã là có thể giữ được những phẩm chất ấy, nhưng "chỉ cần một ví dụ như thế cũng đủ chứng minh rằng sức mạnh bên trong của con người có thể đưa người ấy vượt lên số phận nghiệt ngã của mình".',
    quocGia: "Áo",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Trên Đường Băng",
    tacGia: "Tony Buổi Sáng",
    nhaXuatBan: "688f41df9c2aeb3597130e3b",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f94f" },
      { theLoai: "688f4008949e74faa4e0f954" },
    ],
    ngayXuatBan: "2020-01-01",
    donGia: 96000,
    anhBia: ["/public/uploads/covers/trenduongbang1.jpg"],
    soTrang: 306,
    soLuongTon: 17,
    moTa: 'Trên đường băng là tập hợp những bài viết được ưa thích trên Facebook của Tony Buổi Sáng. Nhưng khác với một tập tản văn thông thường, nội dung các bài được chọn lọc có chủ đích, nhằm chuẩn bị về tinh thần, kiến thức…cho các bạn trẻ vào đời. Sách gồm 3 phần: "Chuẩn bị hành trang", "Trong phòng chờ sân bay" và "Lên máy bay", tương ứng với những quá trình một bạn trẻ phải trải qua trước khi "cất cánh" trên đường băng cuộc đời, bay vào bầu trời cao rộng.\n\nNhững bài viết của Tony sinh động, thiết thực, hài hước và xuất phát từ cái tâm trong sáng của một người đi trước nhiều kinh nghiệm. Anh viết về thái độ với sự học và kiến thức nói chung, cách ứng phó với những trắc trở thử thách khi đi làm, cách sống hào sảng nghĩa tình văn minh…truyền cảm hứng cho các bạn trẻ sống hết mình, trọn vẹn từng phút giây. Tuy đối tượng độc giả chính mà cuốn sách hướng đến là các bạn trẻ, nhưng độc giả lớn tuổi hơn vẫn có thể đọc sách để hiểu và có cách hỗ trợ con em mình một cách đúng đắn, chứ không “ủ” con quá kỹ để rồi tạo ra một thế hệ yếu ớt, không biết tự lập. Những người đi làm nhiều năm đọc sách cũng có thể nhìn lại con đường đi của mình, tự ngẫm đó đã phải là con đường mình muốn đi chưa, bởi thay đổi không bao giờ là quá muộn.',
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
    tacGia: "Nguyễn Nhật Ánh",
    nhaXuatBan: "688f41df9c2aeb3597130e3b",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f958" },
      { theLoai: "688f4008949e74faa4e0f950" },
    ],
    ngayXuatBan: "2019-06-01",
    donGia: 75000,
    anhBia: ["/public/uploads/covers/chotoixinmotvedituoiotho1.jpg"],
    soTrang: 207,
    soLuongTon: 16,
    moTa: "Truyện Cho tôi xin một vé đi tuổi thơ là sáng tác mới nhất của nhà văn Nguyễn Nhật Ánh. Nhà văn mời người đọc lên chuyến tàu quay ngược trở lại thăm tuổi thơ và tình bạn dễ thương của 4 bạn nhỏ. Những trò chơi dễ thương thời bé, tính cách thật thà, thẳng thắn một cách thông minh và dại dột, những ước mơ tự do trong lòng… khiến cuốn sách có thể làm các bậc phụ huynh lo lắng rồi thở phào. Không chỉ thích hợp với người đọc trẻ, cuốn sách còn có thể hấp dẫn và thực sự có ích cho người lớn trong quan hệ với con mình.",
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Mắt Biếc",
    tacGia: "Nguyễn Nhật Ánh",
    nhaXuatBan: "688f41df9c2aeb3597130e3b",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f958" },
      { theLoai: "688f4008949e74faa4e0f951" },
    ],
    ngayXuatBan: "2018-02-20",
    donGia: 89000,
    anhBia: ["/public/uploads/covers/matbiec1.jpg"],
    soTrang: 298,
    soLuongTon: 18,
    moTa: "Một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn này. Một tác phẩm đang được dịch và giới thiệu tại Nhật Bản (theo thông tin từ các báo)… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc rất, rất buồn khi suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn (cái kết thúc không như mong đợi của mọi người). Cũng bởi, mắt biếc… năm xưa nay đâu (theo lời một bài hát).",
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Hành Trình Về Phương Đông",
    tacGia: "Blair T. Spalding",
    nhaXuatBan: "688f41df9c2aeb3597130e40",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f953" },
      { theLoai: "688f4008949e74faa4e0f955" },
    ],
    ngayXuatBan: "2015-01-01",
    donGia: 88000,
    anhBia: ["/public/uploads/covers/hanhtrinhvephuongdong1.jpg"],
    soTrang: 256,
    soLuongTon: 14,
    moTa: "Baird T. Spalding (1857 - 1953) là tác giả của bộ sách \'Life and Teachings of the Masters of the Far East\' (tạm dịch \'Cuộc sống và những lời dạy của các Chân Sư miền viễn đông\').Bộ sách này gồm 6 tập, bản quyền năm 1924, 1937 do DeVorss & Company xuất bản. Một phần của hồi ký đã được chuyển sang Việt ngữ với tựa đề Hành trình về phương Đông.\n\nBộ sách thuật lại những cuộc hành trình vào năm 1894 đến Ấn độ và các nước lân cận của một phái đoàn nghiên cứu gồm 11 nhà khoa học. Trong chuyến đi, họ xác nhận đã có những cuộc tiếp xúc với 'Những bậc Chân Sư cao cả trên dãy Himalaya', những người đã thắng đoạt tử thần. Phái đoàn đã cùng sống, nghiên cứu với những bậc Chân Sư và đã gặt hái được sự hiểu biết sâu sắc về cuộc sống và thế giới tâm linh. Nhờ sự tiếp xúc gần gũi đó, phái đoàn đã chứng kiến rất nhiều vị Chân Sư hiển lộ những quyền năng tinh thần trong cuộc sống hàng ngày, những điều mà đối với người bình thường là phép lạ. Trong số những phép lạ đó có đi trên mặt nước, hay hóa bánh mì ra nhiều giúp cả một đoàn người qua cơn đói.\n\nVới cách trình bày trong sáng, từ ngữ gần gũi, bộ sách trước sau đã trở thành phổ thông đối với những người tìm kiếm đời sống tâm linh, những người có hứng thú với nền minh triết Á Đông, và những người thích đọc sách.",
    quocGia: "Anh",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Cà Phê Cùng Tony",
    tacGia: "Tony Buổi Sáng",
    nhaXuatBan: "688f41df9c2aeb3597130e3d",
    theLoais: [{ theLoai: "688f4008949e74faa4e0f954" }],
    ngayXuatBan: "2021-01-01",
    donGia: 92000,
    anhBia: ["/public/uploads/covers/caphecungtony1.jpg"],
    soTrang: 250,
    soLuongTon: 13,
    moTa: "Cà phê cùng Tony là sự tập hợp các bài viết trên trạng mạng xã hội của tác giả Tony Buổi Sáng (TnBS) về những bài học, câu chuyện anh đã trải nghiệm trong cuộc sống. Đó có thể là cách anh chia sẻ với các bạn trẻ về những chuyện to tát như khởi nghiệp,đạo đức kinh doanh, học tập đến những việc nhỏ nhặt như ăn mặc, giao tiếp, vệ sinh cơ thể… sao cho văn minh, lịch sự. Hay chỉ đơn giản thuật lại những trải nghiệm thực tế của anh trong quá trình sống, kinh doanh ở trong và ngoài nước.\n\nXuyên suốt cuốn sách, các câu chuyện được kể với giọng điệu trào phúng, hài hước lại được thể hiện bằng ngôn ngữ “cư dân mạng” tạo sự gần gũi để các bạn trẻ có thể dễ dàng tiếp nhận. Mặc dù tác giả luôn khẳng định những thông tin, chi tiết trong câu chuyện là hư cấu và thậm xưng nhưng điều đó không có nghĩa làm cuốn sách bớt đi sự thú vị.\n\nChia sẻ về sự ra đời của cuốn sách, tác giả tâm niệm không muốn những điều anh tâm đắc và đúc kết chỉ dừng lại ở mạng xã hội. Anh hi vọng những câu chuyện của mình thông qua Cà phê cùng Tony có thể thổi nguồn cảm hứng tới những độc giả không có điều kiện sử dụng internet, đồng thời khuyến khích văn hóa đọc ở các bạn trẻ trong thời đại mà văn hóa nghe nhìn đang dần chiếm ưu thế. Đơn giản và không cầu kì, đọc Cà phê cùng Tony, độc giả sẽ cảm thấy như đang khám phá câu chuyện của chính mình qua cách kể của một người khác.\n\nĐọc Cà phê cùng Tony, độc giả không thể cười lớn như khi đọc những mẩu chuyện cười, họ chỉ có thể tủm tỉm với những triết lí dí dỏm mà TnBS mang đến.",
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Con Chim Xanh Biếc Bay Về",
    tacGia: "Nguyễn Nhật Ánh",
    nhaXuatBan: "688f41df9c2aeb3597130e3b",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f958" },
      { theLoai: "688f4008949e74faa4e0f956" },
    ],
    ngayXuatBan: "2022-10-01",
    donGia: 97000,
    anhBia: ["/public/uploads/covers/conchimxanhbiecbayve1.jpg"],
    soTrang: 396,
    soLuongTon: 10,
    moTa: 'Không giống như những tác phẩm trước đây lấy bối cảnh vùng quê miền Trung đầy ắp những hoài niệm tuổi thơ dung dị, trong trẻo với các nhân vật ở độ tuổi dậy thì, trong quyển sách mới lần này nhà văn Nguyễn Nhật Ánh lấy bối cảnh chính là Sài Gòn – Thành phố Hồ Chí Minh nơi tác giả sinh sống (như là một sự đền đáp ân tình với mảnh đất miền Nam). Các nhân vật chính trong truyện cũng “lớn” hơn, với những câu chuyện mưu sinh lập nghiệp lắm gian nan thử thách của các sinh viên trẻ đầy hoài bão. Tất nhiên không thể thiếu những câu chuyện tình cảm động, kịch tính và bất ngờ khiến bạn đọc ngẩn ngơ, cười ra nước mắt. Và như trong mọi tác phẩm Nguyễn Nhật Ánh, sự tử tế và tinh thần hướng thượng vẫn là điểm nhấn quan trọng trong quyển sách mới này.\n\nNhư một cuốn phim "trinh thám tình yêu", Con chim xanh biếc bay về dẫn bạn đi hết từ bất ngờ này đến tò mò suy đoán khác, để kết thúc bằng một nỗi hân hoan vô bờ sau bao phen hồi hộp nghi kỵ đến khó thở.\n\nBạn sẽ theo phe sinh viên-nhân viên với những câu thơ dịu dàng và đáo để, hay phe ông chủ với những kỹ năng kinh doanh khởi nghiệp? Và hãy đoán thử, điều gì khiến bạn có thể cảm động đến rưng rưng trong cuộc sống giữa Sài Gòn bộn bề?\n\nLâu lắm mới có hình ảnh thành phố rộn ràng trong tác phẩm của Nguyễn Nhật Ánh - điều hấp dẫn khác thường của Con chim xanh biếc bay về.\n\nChính vì thế mà cuốn sách chỉ có một cách đọc thôi: một mạch từ đầu đến cuối!',
    quocGia: "Việt Nam",
    ngonNgu: "Tiếng Việt",
  },
  {
    tenSach: "Muôn Kiếp Nhân Sinh",
    tacGia: "Nguyên Phong",
    nhaXuatBan: "688f41df9c2aeb3597130e3f",
    theLoais: [
      { theLoai: "688f4008949e74faa4e0f955" },
      { theLoai: "688f4008949e74faa4e0f953" },
    ],
    ngayXuatBan: "2021-07-01",
    donGia: 168000,
    anhBia: ["/public/uploads/covers/muonkiepnhansinh1.jpg "],
    soTrang: 388,
    soLuongTon: 10,
    moTa: 'Là tác phẩm do Giáo sư John Vũ - Nguyên Phong viết từ năm 2017 và hoàn tất đầu năm 2020 ghi lại những câu chuyện, trải nghiệm tiền kiếp kỳ lạ từ nhiều kiếp sống của người bạn tâm giao lâu năm, ông Thomas – một nhà kinh doanh tài chính nổi tiếng ở New York. Những câu chuyện chưa từng tiết lộ này sẽ giúp mọi người trên thế giới chiêm nghiệm, khám phá các quy luật về luật Nhân quả và Luân hồi của vũ trụ giữa lúc trái đất đang gặp nhiều tai ương, biến động, khủng hoảng từng ngày. - “Muôn kiếp nhân sinh” là một bức tranh lớn với vô vàn mảnh ghép cuộc đời, là một cuốn phim đồ sộ, sống động về những kiếp sống huyền bí, trải dài từ nền văn minh Atlantis hùng mạnh đến vương quốc Ai Cập cổ đại của các Pharaoh quyền uy, đến Hợp Chủng Quốc Hoa Kỳ ngày nay. Cuốn sách - "Muôn kiếp nhân sinh" cung cấp cho bạn đọc kiến thức mới mẻ, vô tận của nhân loại lần đầu được hé mở, cùng những phân tích uyên bác, tiên đoán bất ngờ về hiện tại và tương lai thế giới của những bậc hiền triết thông thái. Đời người tưởng chừng rất dài nhưng lại trôi qua rất nhanh, sinh vượng suy tử, mong manh như sóng nước. Luật nhân quả cực kỳ chính xác, chi tiết, phức tạp được thu thập qua nhiều đời, nhiều kiếp, liên hệ tương hỗ đan xen chặt chữ lẫn nhau, không ai có thể tính được tích đức này có thể trừ được nghiệp kia không, không ai có thể biết được khi nào nhân sẽ trổ quả. Nhưng, một khi đã gây ra nhân thì chắc chắn sẽ gặt quả - luật Nhân quả của vũ trụ trước giờ không bao giờ sai.',
    quocGia: "Mỹ",
    ngonNgu: "Tiếng Việt",
  },
];

async function inseartData() {
  await mongoose.connect(config.db.uri);
  console.log("Đã kết nối MongoDB");
  try {
    const result = await Sach.insertMany(data);
    console.log("Dữ liệu đã được chèn:", result);
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
}

inseartData();

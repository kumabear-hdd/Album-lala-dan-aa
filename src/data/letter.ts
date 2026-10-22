export interface LoveLetterData {
  recipient: string;
  sender: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  footerQuote: string;
  dateStr: string;
}

export const LOVE_LETTER_CONTENT: LoveLetterData = {
  recipient: "Lalaa",
  sender: "Aa",
  salutation: "Halooo, wanita hebatnya Aa. 💗",
  paragraphs: [
    "Selamat datang di dunia kecil yang Aa siapkan khusus buat Lalaa.",
    "Di sini, Aa mengumpulkan potongan-potongan cerita kita. Ada foto, lagu, dan kenangan yang mungkin terlihat sederhana, tetapi punya arti tersendiri buat Aa.",
    "Aa mungkin nggak selalu bisa merangkai kata dengan sempurna, tetapi Aa ingin kamu tahu bahwa setiap momen yang kita punya adalah sesuatu yang layak disyukuri.",
    "Semoga setiap kali kamu membuka halaman ini, ada senyum kecil yang muncul. Semoga hari-hari kamu dipenuhi hal baik, hati kamu dikuatkan, dan langkah kamu dimudahkan.",
    "Terima kasih sudah menjadi bagian dari cerita yang begitu berarti buat Aa.",
    "Kalau suatu hari Lalaa rindu dengan kenangan-kenangan ini, semoga dunia kecil kita bisa menjadi tempat yang hangat untuk mengingatnya kembali.",
    "Jaga diri baik-baik, wanita hebatku."
  ],
  signOff: "Dari Aa, yang selalu mendoakan hal-hal baik untuk Lalaa. 💗",
  footerQuote: "Satu dunia kecil, berisi cerita kita.",
  dateStr: "Untuk Lalaa tersayang"
};

import Navbar from "@/components/Navbar";
import avatar from "/assets/avatar.png";
import lokasi from "/assets/lokasi.jpg";
import tinggiGenangan from "/assets/tinggi_genangan.jpg";
import kerusakanBangunan from "/assets/kerusakan_bangunan.jpg";
import kerugianBangunan from "/assets/kerugian_bangunan.jpg";

const Insight = () => {
  return (
    <div className="bg-[#292929] w-full min-h-screen">
      <Navbar />
      <div className="flex justify-center text-white py-14">
        <div className="w-3/4 text-center">
          <p className="mb-8 text-5xl font-bold">
            PEMETAAN DAN ANALISIS KERUGIAN DAERAH TERDAMPAK BANJIR ROB DI
            KECAMATAN KRAKSAAN, PROBOLINGGO
          </p>
          <div className="text-center">
            <img src={avatar} alt="avatar" className="mx-auto h-12 w-12" />
            <p>Gerardus David Ady P.B</p>
            <p className="text-sm">31 Agustus 2023</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/5 text-white text-justify">
          <p className="text-base mb-10">
            Pemukiman di wilayah pesisir Kecamatan Kraksaan, Probolinggo
            berbatasan langsung dengan Selat Madura dan berpotensi tinggi
            terdampak banjir rob karena pasang tinggi tertinggi menyebabkan
            sungai meluap.{" "}
            <span className="text-[#007afc]">
              Penelitian ini bertujuan untuk: (1){" "}
              <span className="underline">
                mengetahui ketinggian genangan banjir rob dan luas area
                tergenang banjir rob,
              </span>{" "}
              (2){" "}
              <span className="underline">
                mengetahui dampak genangan banjir rob terhadap keruskanan
                bangunan,
              </span>{" "}
              (3){" "}
              <span className="underline">
                mengetahui estimasi kerugian bangunan akibat banjir rob.
              </span>
            </span>{" "}
            Pemetaan genangan banjir rob menggunakan metode Hloss memanfaatkan
            data DEM, data citra Sentinel-2A, dan data pasang surut. Perhitungan
            estimasi kerugian bangunan menggunakan metode Damage and Loss
            Assessment (DaLA). Hasil penelitian menunjukan bahwa tinggi genangan
            banjir rob tahun 2021 adalah 2.33 meter dengan kategori bahaya
            rendah seluas 17.55 ha, kategori bahaya sedang seluas 15,33 ha,
            kategori bahaya tinggi seluas 12.49 ha. Bangunan terdampak genangan
            banjir rob pada tahun 2021 kategori bahaya rendah sebanyak 794 unit,
            kategori bahaya sedang sebanyak 400 unit, kategori bahaya tinggi
            sebanyak 538 unit, dan total 1732 unit yang mengalami rusak ringan.
            Kerugian bangunan rumah permanen adalah Rp9,886,758,206, kerugian
            bangunan perdagangan dan jasa adalah Rp9,688,495,305, kerugian
            bangunan industri dan gudang Rp16,866,202,723, kerugian bangunan
            tempat ibadah adalah Rp121,355,451, dan kerugian bangunan kantor
            pemerintah adalah Rp227,541,470. Total kerugian bangunan terdampak
            genangan banjir rob di Kecamatan Kraksaan pada tahun 2021 adalah
            Rp36,790,353,155.
          </p>
          <p className="text-base leading-relaxed mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium tenetur reprehenderit sunt maxime quibusdam distinctio
            culpa unde dolor commodi quo voluptate asperiores, placeat, harum
            voluptas eius. Minima placeat veniam assumenda?
          </p>
          <img src={lokasi} alt="avatar" className="mx-auto mb-10" />

          <p className="text-base leading-relaxed mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium tenetur reprehenderit sunt maxime quibusdam distinctio
            culpa unde dolor commodi quo voluptate asperiores, placeat, harum
            voluptas eius. Minima placeat veniam assumenda?
          </p>
          <img src={tinggiGenangan} alt="avatar" className="mx-auto mb-10" />

          <p className="text-base leading-relaxed mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium tenetur reprehenderit sunt maxime quibusdam distinctio
            culpa unde dolor commodi quo voluptate asperiores, placeat, harum
            voluptas eius. Minima placeat veniam assumenda?
          </p>
          <img src={kerusakanBangunan} alt="avatar" className="mx-auto mb-10" />

          <p className="text-base leading-relaxed mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium tenetur reprehenderit sunt maxime quibusdam distinctio
            culpa unde dolor commodi quo voluptate asperiores, placeat, harum
            voluptas eius. Minima placeat veniam assumenda?
          </p>
          <img src={kerugianBangunan} alt="avatar" className="mx-auto mb-10" />
        </div>
      </div>
    </div>
  );
};

export default Insight;

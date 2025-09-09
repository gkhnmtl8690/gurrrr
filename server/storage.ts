import { type Instrument, type InsertInstrument, type InstrumentOrigin, type InstrumentCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getAllInstruments(): Promise<Instrument[]>;
  getInstrumentsByOrigin(origin: InstrumentOrigin): Promise<Instrument[]>;
  getInstrumentsByCategory(category: InstrumentCategory): Promise<Instrument[]>;
  getInstrumentsByOriginAndCategory(origin: InstrumentOrigin, category: InstrumentCategory): Promise<Instrument[]>;
  getInstrument(id: string): Promise<Instrument | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, any>;
  private instruments: Map<string, Instrument>;

  constructor() {
    this.users = new Map();
    this.instruments = new Map();
    this.seedInstruments();
  }

  private seedInstruments() {
    const instrumentsData: (Omit<Instrument, 'id'> & { id?: string })[] = [
      // Turkish Instruments - Vurmalı
      {
        id: "davul",
        name: "Davul",
        description: "Zurna ile birlikte kullanılan çift taraflı geniş davul",
        origin: "turkish",
        category: "vurmalı",
        audioFile: "/audio/davul.mp3",
        imageUrl: "/attached_assets/asmadavul_1756930984813.jpg",
        isActive: true
      },
      {
        id: "darbuka",
        name: "Darbuka",
        description: "Parmaklarla çalınan kum saati şeklinde ritim enstrümanı",
        origin: "turkish",
        category: "vurmalı",
        audioFile: "/audio/darbuka.mp3",
        imageUrl: "/attached_assets/darbuka_1756930984818.jpeg",
        isActive: true
      },
      {
        id: "bendir",
        name: "Bendir",
        description: "Tasavvuf ve halk müziğinde kullanılan çerçeve davulu",
        origin: "turkish",
        category: "vurmalı",
        audioFile: "/audio/bendir.mp3",
        imageUrl: "/attached_assets/bendir_1756930984816.jpeg",
        isActive: true
      },
      {
        id: "kasik",
        name: "Kaşık",
        description: "Ahşap kaşıklarla icra edilen halk oyunu ritim aracı",
        origin: "turkish",
        category: "vurmalı",
        audioFile: "/audio/kasik.mp3",
        imageUrl: "/attached_assets/kasik_1756930984821.jpg",
        isActive: true
      },
      {
        id: "parmak-zili",
        name: "Parmak Zili",
        description: "Raks ve dansta parmaklara takılan küçük metal ziller",
        origin: "turkish",
        category: "vurmalı",
        audioFile: "/audio/parmak-zili.mp3",
        imageUrl: "/attached_assets/zil_1756931319587.webp",
        isActive: true
      },
      // Turkish Instruments - Telli
      {
        id: "baglama",
        name: "Bağlama",
        description: "Türk halk müziğinin en temel enstrümanı",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/baglama.mp3",
        imageUrl: "/attached_assets/baglama_1756930984814.jpeg",
        isActive: true
      },
      {
        id: "ud",
        name: "Ud",
        description: "Perdesiz armut şeklinde gövdeli telli çalgı",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/ud.mp3",
        imageUrl: "/attached_assets/ud_1756931319585.jpg",
        isActive: true
      },
      {
        id: "cumbus",
        name: "Cümbüş",
        description: "Banjo ve ud karışımı metalik gövdeli çalgı",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/cumbus.mp3",
        imageUrl: "/attached_assets/cumbus_1756930984817.webp",
        isActive: true
      },
      // Turkish Instruments - Yaylı
      {
        id: "kabak-kemane",
        name: "Kabak Kemane",
        description: "Kabağın oyulmasıyla yapılan geleneksel yaylı çalgı",
        origin: "turkish",
        category: "yaylı",
        audioFile: "/audio/kabak-kemane.mp3",
        imageUrl: "/attached_assets/kabakkemane_1756930984819.jpg",
        isActive: true
      },
      {
        id: "karadeniz-kemencesi",
        name: "Karadeniz Kemencesi",
        description: "Karadeniz bölgesine özgü üç telli küçük yaylı çalgı",
        origin: "turkish",
        category: "yaylı",
        audioFile: "/audio/karadeniz-kemencesi.mp3",
        imageUrl: "/attached_assets/kemence_1756930984823.webp",
        isActive: true
      },
      {
        id: "yayli-tanbur",
        name: "Yaylı Tanbur",
        description: "Klasik Türk müziğinde kullanılan uzun saplı yaylı çalgı",
        origin: "turkish",
        category: "yaylı",
        audioFile: "/audio/yayli-tanbur.mp3",
        imageUrl: "/attached_assets/yaylitambur_1756931319586.jpg",
        isActive: true
      },
      // Turkish Instruments - Üflemeli
      {
        id: "ney",
        name: "Ney",
        description: "Kamıştan yapılan tasavvuf müziğinin çalgısı",
        origin: "turkish",
        category: "üflemeli",
        audioFile: "/audio/ney.mp3",
        imageUrl: "/attached_assets/ney_1756931319581.jpg",
        isActive: true
      },
      {
        id: "zurna",
        name: "Zurna",
        description: "Halk oyunları ve törenlerde kullanılan yüksek sesli çalgı",
        origin: "turkish",
        category: "üflemeli",
        audioFile: "/audio/zurna.mp3",
        imageUrl: "/attached_assets/zurna_1756931319588.jpeg",
        isActive: true
      },
      {
        id: "mey",
        name: "Mey",
        description: "Kiraz ağacından yapılan hüzünlü sesli üflemeli çalgı",
        origin: "turkish",
        category: "üflemeli",
        audioFile: "/audio/mey.mp3",
        imageUrl: "/attached_assets/mey_1756931319579.jpg",
        isActive: true
      },
      {
        id: "klarnet",
        name: "Klarnet",
        description: "Tek kamışlı caz ve klasik müziğin popüler çalgısı",
        origin: "turkish",
        category: "üflemeli",
        audioFile: "/audio/klarnet.mp3",
        imageUrl: "/attached_assets/klarnet_1756930984824.jpg",
        isActive: true
      },
      // Turkish Instruments - Tuşlu
      {
        id: "kanun",
        name: "Kanun",
        description: "Mandalları bulunan Türk müziği makamları için tasarlanmış çalgı",
        origin: "turkish",
        category: "tuşlu",
        audioFile: "/audio/kanun.mp3",
        imageUrl: "/attached_assets/kanun_1756930984820.jpeg",
        isActive: true
      },
      
      // Foreign Instruments - Vurmalı
      {
        id: "bateri",
        name: "Bateri",
        description: "Caz, rock ve pop müziğin temelini oluşturan davul seti",
        origin: "foreign",
        category: "vurmalı",
        audioFile: "/audio/bateri.mp3",
        imageUrl: "/attached_assets/bateri_1756930984815.webp",
        isActive: true
      },
      {
        id: "konga",
        name: "Konga",
        description: "Küba kökenli uzun ve dar Latin müziği davulu",
        origin: "foreign",
        category: "vurmalı",
        audioFile: "/audio/konga.mp3",
        imageUrl: "/attached_assets/konga_1756930984825.jpg",
        isActive: true
      },
      {
        id: "kastanyet",
        name: "Kastanyet",
        description: "İspanyol flamenko dansında kullanılan ahşap çalgı",
        origin: "foreign",
        category: "vurmalı",
        audioFile: "/audio/kastanyet.mp3",
        imageUrl: "/attached_assets/kastanyet_1756930984822.jpg",
        isActive: true
      },
      {
        id: "marakas",
        name: "Marakas",
        description: "İçi tohum dolu saplı vurmalı çalgı",
        origin: "foreign",
        category: "vurmalı",
        audioFile: "/audio/marakas.mp3",
        imageUrl: "/attached_assets/marakas_1756931319577.jpg",
        isActive: true
      },
      // Foreign Instruments - Telli
      {
        id: "akustik-gitar",
        name: "Akustik Gitar",
        description: "Popüler müziğin temel enstrümanlarından klasik gitar",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/akustik-gitar.mp3",
        imageUrl: "/attached_assets/akustikgitar_1756930984811.jpg",
        isActive: true
      },
      {
        id: "elektro-gitar",
        name: "Elektro Gitar",
        description: "Rock, blues ve metal müziğinin vazgeçilmez çalgısı",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/elektro-gitar.mp3",
        imageUrl: "/attached_assets/elektrogitar_1756930984818.webp",
        isActive: true
      },
      {
        id: "banjo",
        name: "Banjo",
        description: "Amerikan country ve folk müziğinin tiz ve parlak çalgısı",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/banjo.mp3",
        imageUrl: "/attached_assets/banjo_1756930984815.jpg",
        isActive: true
      },
      {
        id: "mandolin",
        name: "Mandolin",
        description: "İtalyan kökenli küçük armut şekilli neşeli çalgı",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/mandolin.mp3",
        imageUrl: "/attached_assets/mandolin_1756930984827.jpg",
        isActive: true
      },
      {
        id: "arp",
        name: "Arp",
        description: "47 telli büyük konser çalgısı, melodik ve zarif seslerle orkestralarda kullanılır",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/arp.mp3",
        imageUrl: "/attached_assets/arp_1757106092819.webp",
        isActive: true
      },
      // Foreign Instruments - Yaylı
      {
        id: "keman",
        name: "Keman",
        description: "Orkestraların en popüler yüksek perdeli çalgısı",
        origin: "foreign",
        category: "yaylı",
        audioFile: "/audio/keman.mp3",
        imageUrl: "/attached_assets/keman_1756930984822.jpeg",
        isActive: true
      },
      {
        id: "viyolonsel",
        name: "Viyolonsel",
        description: "Kemana göre büyük ve derin sesli oturarak çalınan çalgı",
        origin: "foreign",
        category: "yaylı",
        audioFile: "/audio/viyolonsel.mp3",
        imageUrl: "/attached_assets/viyolonsel_1756931319585.jpeg",
        isActive: true
      },
      {
        id: "kontrbas",
        name: "Kontrbas",
        description: "Orkestranın en büyük ve en kalın sesli yaylı çalgısı",
        origin: "foreign",
        category: "yaylı",
        audioFile: "/audio/kontrbas.mp3",
        imageUrl: "/attached_assets/kontrbas_1756930984826.jpeg",
        isActive: true
      },
      // Foreign Instruments - Üflemeli
      {
        id: "flut",
        name: "Flüt",
        description: "Yan üflemeli parlak ve tiz sesli metal çalgı",
        origin: "foreign",
        category: "üflemeli",
        audioFile: "/audio/flut.mp3",
        imageUrl: "/yanflut.jpg",
        isActive: true
      },
      {
        id: "obua",
        name: "Obua",
        description: "Çifte kamışlı klasik orkestraların zarif sesli üflemeli çalgısı",
        origin: "foreign",
        category: "üflemeli",
        audioFile: "/audio/obua.mp3",
        imageUrl: "/obua_1757075901299.jpg",
        isActive: true
      },
      {
        id: "saksafon",
        name: "Saksafon",
        description: "Caz müziğiyle özdeşleşmiş pirinç konik çalgı",
        origin: "foreign",
        category: "üflemeli",
        audioFile: "/audio/saksafon.mp3",
        imageUrl: "/attached_assets/saksafon_1756931319583.jpg",
        isActive: true
      },
      {
        id: "trompet",
        name: "Trompet",
        description: "Bando müziklerinde kullanılan parlak keskin sesli çalgı",
        origin: "foreign",
        category: "üflemeli",
        audioFile: "/audio/trompet.mp3",
        imageUrl: "/attached_assets/trompet_1756931319584.webp",
        isActive: true
      },
      // Foreign Instruments - Tuşlu
      {
        id: "piyano",
        name: "Piyano",
        description: "En çok bilinen tuşlu konser salonlarının vazgeçilmezi",
        origin: "foreign",
        category: "tuşlu",
        audioFile: "/audio/piyano.mp3",
        imageUrl: "/attached_assets/piyano_1756931319582.jpg",
        isActive: true
      },
      {
        id: "akordeon",
        name: "Akordeon",
        description: "Tuşlu ve körüklü halk müziğinde kullanılan çalgı",
        origin: "foreign",
        category: "tuşlu",
        audioFile: "/audio/akordeon.mp3",
        imageUrl: "/attached_assets/akordeon_1756930984808.jpg",
        isActive: true
      },
      {
        id: "org",
        name: "Org",
        description: "Kiliselerde kullanılan çok klavyeli pedalı devasa çalgı",
        origin: "foreign",
        category: "tuşlu",
        audioFile: "/audio/org.mp3",
        imageUrl: "/attached_assets/org_1756931319582.webp",
        isActive: true
      },
      
      // Interesting Instruments - Vurmalı (Percussion)
      {
        id: "hang-drum",
        name: "Hang Drum (Handpan)",
        description: "UFO'ya benzeyen, elle çalınan bir perküsyon enstrümanıdır. Parmaklarla vurularak çalınır ve mistik, yankılanan, huzur verici bir ses çıkarır.",
        origin: "interesting",
        category: "vurmalı",
        audioFile: "/videos/hangdrum.mp4",
        imageUrl: "/hangdrum_1757075990326.jpeg",
        isActive: true
      },
      {
        id: "djembe",
        name: "Djembe (Cembe)",
        description: "Batı Afrika kökenli, kadeh şeklinde bir el davuludur. Sesi, derinin gerginliğine ve elin vurulduğu yere göre değişir.",
        origin: "interesting",
        category: "vurmalı",
        audioFile: "/videos/djembe.mp4",
        imageUrl: "/Djembe_1757075990325.jpg",
        isActive: true
      },
      {
        id: "singing-bowls",
        name: "Singing Bowls (Şarkı Söyleyen Kaseler)",
        description: "Genellikle Tibet ve Nepal'de meditasyon ve şifa amaçlı kullanılır. Tokmakla kenarı ovalandığında derin, titreşimli bir 'ommm' sesi çıkarır.",
        origin: "interesting",
        category: "vurmalı",
        audioFile: "/videos/singingbowls.mp4",
        imageUrl: "/singingowls_1757075990327.jpg",
        isActive: true
      },
      // Interesting Instruments - Telli (String)
      {
        id: "hurdy-gurdy",
        name: "Hurdy-Gurdy",
        description: "Klavye ve yaylı çalgıların birleşimi gibidir. Keman yayı gibi dönen bir tekerleği vardır ve klavyesindeki tuşlarla melodi çalınır.",
        origin: "interesting",
        category: "telli",
        audioFile: "/videos/hurdygurdy.mp4",
        imageUrl: "/attached_assets/hurdygurdy_1757081392736.jpeg",
        isActive: true
      },
      {
        id: "yaybahar",
        name: "Yaybahar",
        description: "Türk müzisyen Görkem Şen tarafından icat edilmiş bir enstrümandır. Sadece yaylardan ve bir tamburdan oluşur. Sesleri bilim kurgu filmindeki uzay gemisi seslerine benzer.",
        origin: "interesting",
        category: "telli",
        audioFile: "/videos/yaybahar.mp4",
        imageUrl: "/attached_assets/yaybahar_1757081392737.jpg",
        isActive: true
      },
      {
        id: "glass-harp",
        name: "Glass Harp (Cam Arpı)",
        description: "Farklı boyutlarda su dolu cam kadehlerden oluşur. Parmağı su dolu camın kenarında gezdirerek melodik sesler çıkarılır.",
        origin: "interesting",
        category: "telli",
        audioFile: "/videos/glass-harp.mp4",
        imageUrl: "/attached_assets/glassharp_1757081392735.jpg",
        isActive: true
      },
      // Interesting Instruments - Videolar
      {
        id: "video-1",
        name: "1. Video",
        description: "Enteresan çalgılar video serisi - Birinci video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan1.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-2",
        name: "2. Video",
        description: "Enteresan çalgılar video serisi - İkinci video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan2.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-3",
        name: "3. Video",
        description: "Enteresan çalgılar video serisi - Üçüncü video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan3.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-4",
        name: "4. Video",
        description: "Enteresan çalgılar video serisi - Dördüncü video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan4.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-5",
        name: "5. Video",
        description: "Enteresan çalgılar video serisi - Beşinci video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan5.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-6",
        name: "6. Video",
        description: "Enteresan çalgılar video serisi - Altıncı video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan6.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-7",
        name: "7. Video",
        description: "Enteresan çalgılar video serisi - Yedinci video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan7.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-8",
        name: "8. Video",
        description: "Enteresan çalgılar video serisi - Sekizinci video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan8.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-9",
        name: "9. Video",
        description: "Enteresan çalgılar video serisi - Dokuzuncu video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan9.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "video-10",
        name: "10. Video",
        description: "Enteresan çalgılar video serisi - Onuncu video",
        origin: "interesting",
        category: "videolar",
        audioFile: "/videos/enteresan10.mp4",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Interesting Instruments - Üflemeli (Wind)
      {
        id: "didgeridoo",
        name: "Didgeridoo",
        description: "Avustralya Aborjinlerine ait, silindirik ve uzun bir nefesli çalgıdır. Genellikle ağaç gövdesinin içi termitler tarafından oyularak yapılır. Derin, rezonanslı ve titreşimli bir ses çıkarır.",
        origin: "interesting",
        category: "üflemeli",
        audioFile: "/videos/didgeridoo.mp4",
        imageUrl: "/didgeridoo_1757075990324.jpg",
        isActive: true
      },
      {
        id: "hydraulophone",
        name: "Hydraulophone",
        description: "Su gücüyle çalışan bir müzik enstrümanıdır. Tıpkı bir org gibi tuşları vardır, ancak tuşlara basıldığında su jetleri çıkarır. Su jetlerinin engellenmesi veya serbest bırakılmasıyla müzik yapılır.",
        origin: "interesting",
        category: "üflemeli",
        audioFile: "/videos/hydraulophone.mp4",
        imageUrl: "/hydraulophone_1757075990327.webp",
        isActive: true
      },
      // Interesting Instruments - Tuşlu (Keyboard)
      {
        id: "theremin",
        name: "Theremin",
        description: "Elektronik bir müzik aletidir. Hiçbir yere dokunmadan, sadece ellerinizi antenlere yaklaştırıp uzaklaştırarak havada ses çıkarırsınız. Bilim kurgu filmlerinde kullanılan o tuhaf, ürkütücü sesler genellikle Theremin'den gelir.",
        origin: "interesting",
        category: "tuşlu",
        audioFile: "/videos/theremin.mp4",
        imageUrl: "/theremin_1757076062996.jpg",
        isActive: true
      },
      {
        id: "otomat",
        name: "Otomat (Otomaton)",
        description: "Mekanik olarak çalışan bir müzik enstrümanıdır. Tıpkı bir saat mekanizması gibi içindeki çarklar ve dişliler, metal plakalar üzerine yerleştirilmiş nota düzenine göre sesler çıkarır.",
        origin: "interesting",
        category: "tuşlu",
        audioFile: "/videos/otomat.mp4",
        imageUrl: "/otomaton_1757076041579.jpg",
        isActive: true
      }
    ];

    instrumentsData.forEach(instrument => {
      const id = instrument.id || randomUUID();
      this.instruments.set(id, { ...instrument, id });
    });
  }

  async getUser(id: string): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = randomUUID();
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllInstruments(): Promise<Instrument[]> {
    return Array.from(this.instruments.values()).filter(i => i.isActive);
  }

  async getInstrumentsByOrigin(origin: InstrumentOrigin): Promise<Instrument[]> {
    return Array.from(this.instruments.values()).filter(i => i.isActive && i.origin === origin);
  }

  async getInstrumentsByCategory(category: InstrumentCategory): Promise<Instrument[]> {
    return Array.from(this.instruments.values()).filter(i => i.isActive && i.category === category);
  }

  async getInstrumentsByOriginAndCategory(origin: InstrumentOrigin, category: InstrumentCategory): Promise<Instrument[]> {
    return Array.from(this.instruments.values()).filter(i => i.isActive && i.origin === origin && i.category === category);
  }

  async getInstrument(id: string): Promise<Instrument | undefined> {
    const instrument = this.instruments.get(id);
    return instrument?.isActive ? instrument : undefined;
  }
}

export const storage = new MemStorage();

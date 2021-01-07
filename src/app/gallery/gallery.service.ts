import { Injectable } from '@angular/core'

@Injectable()
export class GalleryService {
    visibleImages = [];

    getImages() {
        return this.visibleImages = IMAGES.slice(0);
    }

    getImage(id: number) {
        return IMAGES.slice(0).find(image => image.id == id)
    }
}

const IMAGES = [

    // { "id": 1, "category": "events", "caption": "", "url": "assets/ImageGallery/event_01.JPG" },
    { "id": 2, "category": "events", "caption": "", "url": "assets/ImageGallery/event_02.jpg" },
    { "id": 3, "category": "events", "caption": "", "url": "assets/ImageGallery/event_03.JPG" },
    // { "id": 4, "category": "events", "caption": "", "url": "assets/ImageGallery/event_04.JPG" },
    // { "id": 5, "category": "events", "caption": "", "url": "assets/ImageGallery/event_05.JPG" },
    { "id": 14, "category": "events", "caption": "", "url": "assets/ImageGallery/event_06.jpg" },
    { "id": 15, "category": "events", "caption": "", "url": "assets/ImageGallery/event_07.jpg" },
    { "id": 29, "category": "events", "caption": "", "url": "assets/ImageGallery/event_08.JPG" },
    { "id": 30, "category": "events", "caption": "", "url": "assets/ImageGallery/event_09.JPG" },
    { "id": 31, "category": "events", "caption": "", "url": "assets/ImageGallery/event_10.JPG" },
    { "id": 32, "category": "events", "caption": "", "url": "assets/ImageGallery/event_11.JPG" },
    { "id": 33, "category": "events", "caption": "", "url": "assets/ImageGallery/event_13.JPG" },
    { "id": 34, "category": "events", "caption": "", "url": "assets/ImageGallery/event_14.JPG" },
    { "id": 35, "category": "events", "caption": "", "url": "assets/ImageGallery/event_15.JPG" },
    { "id": 36, "category": "events", "caption": "", "url": "assets/ImageGallery/event_16.JPG" },
    { "id": 37, "category": "events", "caption": "", "url": "assets/ImageGallery/event_17.JPG" },
    { "id": 38, "category": "events", "caption": "", "url": "assets/ImageGallery/event_18.JPG" },
    { "id": 39, "category": "events", "caption": "", "url": "assets/ImageGallery/event_19.JPG" },
    { "id": 40, "category": "events", "caption": "", "url": "assets/ImageGallery/event_20.JPG" },
    { "id": 41, "category": "events", "caption": "", "url": "assets/ImageGallery/event_21.JPG" },
    { "id": 42, "category": "events", "caption": "", "url": "assets/ImageGallery/event_22.JPG" },
    { "id": 43, "category": "events", "caption": "", "url": "assets/ImageGallery/event_23.JPG" },
    { "id": 44, "category": "events", "caption": "", "url": "assets/ImageGallery/event_24.JPG" },
    { "id": 45, "category": "events", "caption": "", "url": "assets/ImageGallery/event_25.JPG" },
    { "id": 46, "category": "events", "caption": "", "url": "assets/ImageGallery/event_26.JPG" },
    { "id": 47, "category": "events", "caption": "", "url": "assets/ImageGallery/event_27.JPG" },
    { "id": 48, "category": "events", "caption": "", "url": "assets/ImageGallery/event_28.JPG" },
    { "id": 49, "category": "events", "caption": "", "url": "assets/ImageGallery/event_29.JPG" },
    { "id": 50, "category": "events", "caption": "", "url": "assets/ImageGallery/event_30.JPG" },
    { "id": 51, "category": "events", "caption": "", "url": "assets/ImageGallery/event_31.JPG" },
    { "id": 52, "category": "events", "caption": "", "url": "assets/ImageGallery/event_32.JPG" },
   // { "id": 53, "category": "events", "caption": "", "url": "assets/ImageGallery/event_33.JPG" },
    { "id": 54, "category": "events", "caption": "", "url": "assets/ImageGallery/event_34.JPG" },
    { "id": 55, "category": "events", "caption": "", "url": "assets/ImageGallery/event_35.JPG" },
    { "id": 56, "category": "events", "caption": "", "url": "assets/ImageGallery/event_36.JPG" },
    { "id": 57, "category": "events", "caption": "", "url": "assets/ImageGallery/event_37.JPG" },
    { "id": 58, "category": "events", "caption": "", "url": "assets/ImageGallery/event_38.JPG" },
    { "id": 59, "category": "events", "caption": "", "url": "assets/ImageGallery/event_39.JPG" },
    { "id": 60, "category": "events", "caption": "", "url": "assets/ImageGallery/event_40.JPG" },
    { "id": 61, "category": "events", "caption": "", "url": "assets/ImageGallery/event_41.JPG" },
    { "id": 62, "category": "events", "caption": "", "url": "assets/ImageGallery/event_42.JPG" },
    { "id": 63, "category": "events", "caption": "", "url": "assets/ImageGallery/event_43.JPG" },
    { "id": 64, "category": "events", "caption": "", "url": "assets/ImageGallery/event_44.JPG" },
    { "id": 65, "category": "events", "caption": "", "url": "assets/ImageGallery/event_45.JPG" },
    //{ "id": 66, "category": "events", "caption": "", "url": "assets/ImageGallery/event_46.JPG" },
    { "id": 67, "category": "events", "caption": "", "url": "assets/ImageGallery/event_47.JPG" },
    { "id": 68, "category": "events", "caption": "", "url": "assets/ImageGallery/event_48.JPG" },
    { "id": 69, "category": "events", "caption": "", "url": "assets/ImageGallery/event_49.JPG" },
    { "id": 70, "category": "events", "caption": "", "url": "assets/ImageGallery/event_50.JPG" },
    { "id": 71, "category": "events", "caption": "", "url": "assets/ImageGallery/event_51.JPG" },
    { "id": 72, "category": "events", "caption": "", "url": "assets/ImageGallery/event_51.JPG" },
    { "id": 73, "category": "events", "caption": "", "url": "assets/ImageGallery/event_53.JPG" },
    { "id": 74, "category": "events", "caption": "", "url": "assets/ImageGallery/event_54.JPG" },
    { "id": 75, "category": "events", "caption": "", "url": "assets/ImageGallery/event_55.JPG" },
    { "id": 76, "category": "events", "caption": "", "url": "assets/ImageGallery/event_56.JPG" },
    { "id": 77, "category": "events", "caption": "", "url": "assets/ImageGallery/event_57.JPG" },
    { "id": 78, "category": "events", "caption": "", "url": "assets/ImageGallery/event_58.JPG" },
    { "id": 79, "category": "events", "caption": "", "url": "assets/ImageGallery/event_59.JPG" },
    { "id": 80, "category": "events", "caption": "", "url": "assets/ImageGallery/event_60.JPG" },
    { "id": 81, "category": "events", "caption": "", "url": "assets/ImageGallery/event_61.JPG" },
    { "id": 82, "category": "events", "caption": "", "url": "assets/ImageGallery/event_62.JPG" },
    { "id": 83, "category": "events", "caption": "", "url": "assets/ImageGallery/event_63.JPG" },
    { "id": 84, "category": "events", "caption": "", "url": "assets/ImageGallery/event_64.JPG" },
    { "id": 85, "category": "events", "caption": "", "url": "assets/ImageGallery/event_65.JPG" },
    { "id": 86, "category": "events", "caption": "", "url": "assets/ImageGallery/event_66.JPG" },
    { "id": 87, "category": "events", "caption": "", "url": "assets/ImageGallery/event_67.JPG" },
    { "id": 88, "category": "events", "caption": "", "url": "assets/ImageGallery/event_68.JPG" },
    { "id": 89, "category": "events", "caption": "", "url": "assets/ImageGallery/event_69.JPG" },
    { "id": 90, "category": "events", "caption": "", "url": "assets/ImageGallery/event_70.JPG" },
    { "id": 91, "category": "events", "caption": "", "url": "assets/ImageGallery/event_71.JPG" },
    { "id": 92, "category": "events", "caption": "", "url": "assets/ImageGallery/event_72.JPG" },
    { "id": 93, "category": "events", "caption": "", "url": "assets/ImageGallery/event_73.JPG" },
    { "id": 94, "category": "events", "caption": "", "url": "assets/ImageGallery/event_74.JPG" },
    { "id": 95, "category": "events", "caption": "", "url": "assets/ImageGallery/event_75.JPG" },
    { "id": 96, "category": "events", "caption": "", "url": "assets/ImageGallery/event_76.JPG" },
    { "id": 97, "category": "events", "caption": "", "url": "assets/ImageGallery/event_77.JPG" },
   // { "id": 98, "category": "events", "caption": "", "url": "assets/ImageGallery/event_95.jpg" },
   // { "id": 99, "category": "events", "caption": "", "url": "assets/ImageGallery/event_96.jpeg" },
    //{ "id": 100, "category": "events", "caption": "", "url": "assets/ImageGallery/event_97.jpeg" },
    //{ "id": 101, "category": "events", "caption": "", "url": "assets/ImageGallery/event_98.jpeg" },
    { "id": 102, "category": "events", "caption": "", "url": "assets/ImageGallery/event_99.jpeg" },
   // { "id": 103, "category": "events", "caption": "", "url": "assets/ImageGallery/event_100.jpeg" },
    { "id": 104, "category": "events", "caption": "", "url": "assets/ImageGallery/event_101.jpg" },









    { "id": 12, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_07.jpeg" },

    { "id": 6, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_01.JPG" },
    // {"id":7, "category": "vip", "caption": "", "url":"assets/ImageGallery/vip_02.jpeg"},
    { "id": 8, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_03.jpg" },
    { "id": 9, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_04.jpeg" },
    { "id": 10, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_05.jpeg" },
    { "id": 11, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_06.jpeg" },

    { "id": 13, "category": "vip", "caption": "", "url": "assets/ImageGallery/vip_08.JPG" },

    { "id": 16, "category": "pressrelease", "caption": "", "url": "assets/ImageGallery/article_01.jpeg" },
    { "id": 17, "category": "pressrelease", "caption": "", "url": "assets/ImageGallery/article_02.jpeg" },
    { "id": 18, "category": "pressrelease", "caption": "", "url": "assets/ImageGallery/article_03.jpeg" },
    { "id": 19, "category": "pressrelease", "caption": "", "url": "assets/ImageGallery/article_04.jpeg" },
    { "id": 20, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_01.png" },
    { "id": 21, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_02.png" },
    { "id": 22, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_03.png" },
    { "id": 23, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_04.png" },
    { "id": 24, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_05.png" },
    { "id": 25, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_06.png" },
    { "id": 26, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_07.png" },
    { "id": 27, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_08.png" },
    { "id": 28, "category": "pandits", "caption": "", "url": "assets/ImageGallery/pandits_09.png" },


]

export default class Utils {

    static getMobileOperatingSystem() {

        const userAgent = navigator.userAgent || navigator.vendor;

        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }

        if (/android/i.test(userAgent)) {
            return 'Android';
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            return 'iOS';
        }

        return 'unknown';
    }
}

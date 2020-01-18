import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faFacebookF,
    faTwitter,
    faLinkedinIn,
    faGooglePlusG,
    faWhatsapp,
    faFacebookMessenger,
    faTelegramPlane
} from '@fortawesome/free-brands-svg-icons';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const icons = [
    faFacebookF,
    faTwitter,
    faLinkedinIn,
    faGooglePlusG,
    faWhatsapp,
    faFacebookMessenger,
    faTelegramPlane,
    faEnvelope,
];

library.add(...icons);

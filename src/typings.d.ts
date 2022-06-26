export interface TextMessage {
    text: string;
    date: string;
    index: 1 | 2;
}

export type Section = 'Messages' | 'Social' | 'Profile' | 'None'
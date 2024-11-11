import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

class Helpers {
    public static isCloseToBottom(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
        const paddingToBottom = 10;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }

    public static formatCreatedAt(dateStr: string): string {
        const createdAt = new Date(dateStr);
        const now = new Date();

        // Calculate time difference in milliseconds
        const diffInMs = now.getTime() - createdAt.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        // If uploaded on the same day, show minutes or hours.
        if (diffInDays === 0) {
            if (diffInMinutes < 60) {
                return `${diffInMinutes} menit`;
            } else {
                return `${diffInHours} jam`;
            }
        }

        // If uploaded within the last 1–20 days, display the number of days
        if (diffInDays <= 20) {
            return `${diffInDays} hari lalu`;
        }

        // If more than 14 days, display the date in "20 Jul 2024" format.
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
        return createdAt.toLocaleDateString('id', options);
    }
}

export default Helpers;

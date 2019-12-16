// All rendered options for a calendar

export class CalendarOptions {
    constructor(
        // height of each square height representing an hour
        public hourPixelSize: number = 43,
        // viewType : week/day/month
        public viewType: string = 'week',
        // representing hours displayed
        public hoursList: string[] = [
            '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
        // list of days indexes displayed
        public dayList: number[] = [0, 1, 2, 3, 4, 5, 6],
    ) {}
}
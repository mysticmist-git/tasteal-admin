import { LunarDate } from '@nghiavuive/lunar_date_vi';

export function convertLunarToSolarDate(lunarDate: Date) {
  const lunarDate_Real = new LunarDate({
    year: lunarDate.getFullYear(),
    month: lunarDate.getMonth() + 1,
    day: lunarDate.getDate(),
  });
  lunarDate_Real.init();

  return new Date(lunarDate_Real.toSolarDate().toDate());
}

export function convertToSnakeCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}

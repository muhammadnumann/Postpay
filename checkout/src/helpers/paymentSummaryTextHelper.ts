import { Maybe } from '@/graphql';
import { Dayjs } from 'dayjs';

const abaricMonthList = [
  'يناير',
  'فبراير',
  'مارس',
  'إبريل',
  'مايو',
  'يونية',
  'يولية',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export function formatScheduleDate(date: Dayjs, language: string) {
  if (language === 'en') return date.format('DD MMM');
  return date.get('date') + ' ' + abaricMonthList[date.get('month')];
}

export function getInstalmentName(number: number, language: string) {
  if (language === 'ar') {
    return `قسط ${number}`;
  }
  return 'Instalment ' + number;
}

export function getSchedulePeriodLabel(
  instalmentDelta: Maybe<number>,
  scheduleIndex: number,
  language: string = 'en'
) {
  if (language === 'ar') {
    return _getArabicSchedulePeriodLabel(instalmentDelta, scheduleIndex);
  }
  return _getEnglishSchedulePeriodLabel(instalmentDelta, scheduleIndex);
}

function _getArabicSchedulePeriodLabel(
  instalmentDelta: Maybe<number>,
  scheduleIndex: number
) {
  if (scheduleIndex === 0) {
    return 'اليوم';
  }

  if (!instalmentDelta) {
    if (scheduleIndex === 1) {
      return 'بعد شهر';
    } else if (scheduleIndex === 2) {
      return 'بعد شهرين';
    } else if (scheduleIndex > 2 && scheduleIndex <= 10) {
      return `${scheduleIndex} أشهر`;
    } else {
      return `${scheduleIndex} شهرا`;
    }
  }

  if (instalmentDelta % 7 === 0) {
    if (scheduleIndex === 1) {
      return 'أسبوع';
    } else if (scheduleIndex === 2) {
      return 'أسبوعين';
    } else if (scheduleIndex > 2 && scheduleIndex <= 10) {
      return `${scheduleIndex} أسابيع`;
    } else {
      return `${scheduleIndex} أسبوع`;
    }
  }

  if (scheduleIndex === 1) {
    return 'يوم';
  } else if (scheduleIndex === 2) {
    return 'يومان';
  } else if (scheduleIndex > 2 && scheduleIndex <= 10) {
    return `${scheduleIndex} أيام`;
  } else {
    return `${scheduleIndex} يوم`;
  }
}

function _getEnglishSchedulePeriodLabel(
  instalmentDelta: Maybe<number>,
  scheduleIndex: number
) {
  if (scheduleIndex === 0) return 'Today';
  if (!instalmentDelta) {
    return `${scheduleIndex} month${scheduleIndex > 1 ? 's' : ''}`;
  }
  if (instalmentDelta % 7 === 0) {
    const weekPerSchedule = instalmentDelta / 7;
    const weekNumber = scheduleIndex * weekPerSchedule;
    return `${weekNumber} week${weekNumber > 1 ? 's' : ''}`;
  }
  const day = instalmentDelta * scheduleIndex;
  return `${day} day${day > 1 ? 's' : ''}`;
}

export function getInstalmentDeltaText(
  instalmentDelta: Maybe<number>,
  language = 'en'
) {
  if (language === 'ar') {
    return _getArabicInstalmentDeltaText(instalmentDelta);
  }
  return _getEnglishInstalmentDeltaText(instalmentDelta);
}

function _getEnglishInstalmentDeltaText(instalmentDelta: Maybe<number>) {
  if (!instalmentDelta || instalmentDelta === 30) {
    return 'every month';
  } else if (instalmentDelta === 1) {
    return 'every day';
  } else if (instalmentDelta === 7) {
    return 'every week';
  } else if (instalmentDelta % 7 === 0) {
    return `every ${instalmentDelta / 7} weeks`;
  } else {
    return `every ${instalmentDelta} days`;
  }
}

function _getArabicInstalmentDeltaText(instalmentDelta: Maybe<number>) {
  const weekCount = instalmentDelta ? instalmentDelta / 7 : 0;
  if (!instalmentDelta || instalmentDelta === 30) {
    return 'كل شهر';
  } else if (instalmentDelta === 1) {
    return 'كل يو';
  } else if (instalmentDelta === 7) {
    return 'كل أسبوع';
  } else if (instalmentDelta % 7 === 0 && weekCount === 2) {
    return `كل أسبوعين`;
  } else if (instalmentDelta % 7 === 0 && weekCount > 2 && weekCount <= 10) {
    return `كل ${weekCount} أسابيع`;
  } else if (instalmentDelta % 7 === 0 && weekCount > 10) {
    return `كل ${weekCount} أسبوع`;
  } else if (instalmentDelta === 2) {
    return 'كل يومين';
  } else if (instalmentDelta > 2 && instalmentDelta <= 10) {
    return `كل ${instalmentDelta} أيام`;
  } else if (instalmentDelta > 10) {
    return `كل ${instalmentDelta} يوما`;
  }
}

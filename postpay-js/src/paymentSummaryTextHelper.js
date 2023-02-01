import { formatNumber } from './helper';

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

const englishMonthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatScheduleDate(date, language, includeFullYear = false) {
  if (language === 'ar') {
    return date.getDate() + ' ' + abaricMonthList[date.getMonth()];
  }
  return (
    formatNumber(date.getDate()) +
    '-' +
    englishMonthList[date.getMonth()] +
    ' ' +
    (includeFullYear ? date.getFullYear() : '')
  );
}

export function getInstalmentName(number, language) {
  if (language === 'ar') {
    return `قسط ${number}`;
  }
  return 'Instalment ' + number;
}

export function getSchedulePeriodLabel(
  instalmentDelta,
  scheduleIndex,
  language = 'en'
) {
  if (language === 'ar') {
    return _getArabicSchedulePeriodLabel(instalmentDelta, scheduleIndex);
  }
  return _getEnglishSchedulePeriodLabel(instalmentDelta, scheduleIndex);
}

function _getArabicSchedulePeriodLabel(instalmentDelta, scheduleIndex) {
  if (scheduleIndex === 0) {
    return 'اليوم';
  }

  if (!instalmentDelta) {
    if (scheduleIndex === 1) {
      return 'بعد شهر';
    } else if (scheduleIndex === 2) {
      return 'بعد شهرين';
    } else if (scheduleIndex > 2 && scheduleIndex <= 10) {
      return `بعد ${scheduleIndex} اشهر`;
    } else {
      return `${scheduleIndex} شهرا`;
    }
  }

  if (instalmentDelta === 14) {
    if (scheduleIndex === 1) {
      return 'بعد أسبوعين';
    } else if (scheduleIndex === 2) {
      return 'بعد 4 أسابيع';
    } else if (scheduleIndex === 3) {
      return 'بعد 6 أسابيع';
    }
  }

  if (instalmentDelta % 7 === 0) {
    if (scheduleIndex === 1) {
      return 'بعد أسبوع';
    } else if (scheduleIndex === 2) {
      return 'بعد أسبوعين';
    } else if (scheduleIndex > 2 && scheduleIndex <= 10) {
      return `بعد ${scheduleIndex} أسابيع`;
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

function _getEnglishSchedulePeriodLabel(instalmentDelta, scheduleIndex) {
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

export function getInstalmentDeltaTextForInfoModalTitle(
  instalmentDelta,
  language = 'en'
) {
  if (language === 'ar') {
    if (!instalmentDelta) {
      return 'شهرية';
    } else if (instalmentDelta === 7) {
      return 'اسبوعية';
    } else if (instalmentDelta / 7 === 2) {
      return 'نصف شهرية';
    } else if (instalmentDelta === 1) {
      return 'يومية';
    }
  } else {
    if (!instalmentDelta || instalmentDelta === 30) {
      return 'monthly';
    } else if (instalmentDelta === 1) {
      return 'daily';
    } else if (instalmentDelta === 7) {
      return 'weekly';
    } else if (instalmentDelta / 7 === 2) {
      return 'bi-weekly';
    } else if (instalmentDelta % 7 === 0) {
      return `${instalmentDelta / 7} weeks`;
    } else {
      return `${instalmentDelta} days`;
    }
  }
}

export function getInstalmentDeltaText(instalmentDelta, language = 'en') {
  if (language === 'ar') {
    return _getArabicInstalmentDeltaText(instalmentDelta);
  }
  return _getEnglishInstalmentDeltaText(instalmentDelta);
}

function _getEnglishInstalmentDeltaText(instalmentDelta) {
  if (!instalmentDelta || instalmentDelta === 30) {
    return 'on monthly basis';
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

function _getArabicInstalmentDeltaText(instalmentDelta) {
  const weekCount = instalmentDelta ? instalmentDelta / 7 : 0;
  if (!instalmentDelta || instalmentDelta === 30) {
    return 'في شهرية';
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

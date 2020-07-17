function themeFromSchool(school) {
  const theme = {
    bannerBackground: school.theme.backgroundImage,
    brandPrimary: school.theme.themeColor.hex,
    displayName: school.displayName,
    logo: school.theme.logo,
    tagLine: school.theme.tagLine,
  };
  return theme;
}

export default themeFromSchool;

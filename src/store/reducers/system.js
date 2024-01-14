import config from "config";
import systemActions from "../actions/system";

const initialState = {
  currentLangCode: config.DEFAULT_LANGUAGE,
  currentCountryCode: config.DEFAULT_COUNTRY,
  callback: false,
  colors: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case systemActions.Callback.SUCCESS: {
      return {
        ...state,
        callback: true
      };
    }
    case systemActions.Callback.FAILURE: {
      return {
        ...state,
        callback: false
      };
    }

    case systemActions.GetColors.SUCCESS: {
      const { colors } = action.payload;
      return {
        ...state,
        colors: colors
      };
    }

    case systemActions.GetColors.FAILURE: {
      return {
        ...state,
        colors: []
      };
    }

    case systemActions.ChangeLanguage.TRIGGER: {
      return { ...state, currentLangCode: action.payload };
    }

    case systemActions.ChangeCountry.TRIGGER: {
      return { ...state, currentCountryCode: action.payload };
    }

    default:
      return state;
  }
};

import {
  AD_UNITS_CREATE_PENDING,
  AD_UNITS_CREATE_SUCCESS,
  AD_UNITS_CREATE_ERROR,
  AD_UNITS_FETCH_ALL_PENDING,
  AD_UNITS_FETCH_ALL_SUCCESS,
  AD_UNITS_FETCH_ALL_ERROR,
  AD_UNITS_FETCH_ONE_PENDING,
  AD_UNITS_FETCH_ONE_SUCCESS,
  AD_UNITS_FETCH_ONE_ERROR,
  AD_UNITS_UPDATE_PENDING,
  AD_UNITS_UPDATE_SUCCESS,
  AD_UNITS_UPDATE_ERROR,
  AD_UNITS_DELETE_PENDING,
  AD_UNITS_DELETE_SUCCESS,
  AD_UNITS_DELETE_ERROR,
  AD_SETTINGS_FETCH_PENDING,
  AD_SETTINGS_FETCH_SUCCESS,
  AD_SETTINGS_FETCH_ERROR,
  AD_SETTINGS_UPSERT_PENDING,
  AD_SETTINGS_UPSERT_SUCCESS,
  AD_SETTINGS_UPSERT_ERROR,
} from "./adSenseActions";

const initialState = {
  adUnits: [],
  adUnit: null,
  adSettings: null,
  loading: false,
  error: null,
};

const adsenseReducer = (state = initialState, action) => {
  switch (action.type) {
    // PENDING STATES
    case AD_UNITS_CREATE_PENDING:
    case AD_UNITS_FETCH_ALL_PENDING:
    case AD_UNITS_FETCH_ONE_PENDING:
    case AD_UNITS_UPDATE_PENDING:
    case AD_UNITS_DELETE_PENDING:
    case AD_SETTINGS_FETCH_PENDING:
    case AD_SETTINGS_UPSERT_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // AD UNITS SUCCESS
    case AD_UNITS_CREATE_SUCCESS: {
      if (!action.payload || !action.payload.id) {
        console.warn("Invalid ad unit payload in CREATE_SUCCESS:", action.payload);
        return state;
      }
      return {
        ...state,
        loading: false,
        adUnits: [...state.adUnits, action.payload],
      };
    }

    case AD_UNITS_FETCH_ALL_SUCCESS: {
      const adUnits = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        loading: false,
        adUnits,
      };
    }

    case AD_UNITS_FETCH_ONE_SUCCESS: {
      return {
        ...state,
        loading: false,
        adUnit: action.payload || null,
      };
    }

    case AD_UNITS_UPDATE_SUCCESS: {
      if (!action.payload || !action.payload.id) {
        console.warn("Invalid ad unit payload in UPDATE_SUCCESS:", action.payload);
        return state;
      }
      return {
        ...state,
        loading: false,
        adUnit: action.payload,
        adUnits: state.adUnits.map((unit) =>
          unit.id === action.payload.id ? action.payload : unit
        ),
      };
    }

    case AD_UNITS_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        adUnits: state.adUnits.filter((unit) => unit.id !== action.payload),
        adUnit: state.adUnit?.id === action.payload ? null : state.adUnit,
      };
    }

    // AD SETTINGS SUCCESS
    case AD_SETTINGS_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        adSettings: action.payload || null,
      };
    }

    case AD_SETTINGS_UPSERT_SUCCESS: {
      return {
        ...state,
        loading: false,
        adSettings: action.payload || null,
      };
    }

    // ERRORS
    case AD_UNITS_CREATE_ERROR:
    case AD_UNITS_FETCH_ALL_ERROR:
    case AD_UNITS_FETCH_ONE_ERROR:
    case AD_UNITS_UPDATE_ERROR:
    case AD_UNITS_DELETE_ERROR:
    case AD_SETTINGS_FETCH_ERROR:
    case AD_SETTINGS_UPSERT_ERROR: {
      console.error(`Error in ${action.type}:`, action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default adsenseReducer;
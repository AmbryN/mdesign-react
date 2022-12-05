import axios from "axios";
import baseUrl from "@api/baseUrl";
import { z } from "zod";
import { MDesignResultSchema } from "@api/models";
import { authHeader } from "@api/utils/auth.header";

const mDesignResultsArray = z.array(MDesignResultSchema);

const getEventDatesAtAddress = async (
  start: string,
  end: string,
  addressName: string
) => {
  let response = await axios.get(
    `${baseUrl}/queries/event_dates_at_address?start=${start}&end=${end}&addressName=${addressName}`,
    { headers: authHeader() }
  );
  return response.data;
};

const countEventsParticipationByAddress = async (
  start: string,
  end: string
) => {
  let response = await axios.get(
    `${baseUrl}/queries/count_events_participation_by_address?start=${start}&end=${end}`,
    { headers: authHeader() }
  );
  return response.data;
};

const countGenderParticipationByAddress = async (
  start: string,
  end: string,
  gender: string
) => {
  let response = await axios.get(
    `${baseUrl}/queries/count_gender_participation_by_address?start=${start}&end=${end}&gender=${gender}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getMDesginResults = async (start: string, end: string) => {
  let response = await axios.get(
    `${baseUrl}/queries/mdesign?start=${start}&end=${end}`,
    { headers: authHeader() }
  );
  return mDesignResultsArray.parse(response.data);
};

export {
  getEventDatesAtAddress,
  countEventsParticipationByAddress,
  countGenderParticipationByAddress,
  getMDesginResults,
};

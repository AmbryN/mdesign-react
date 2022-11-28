import { Event } from "@api/models";

export default function EventDescription({ event }: { event: Event }) {
  const { name, type, date, address, soldHours, startTime, endTime, url } =
    event;
  return (
    <div className="w-5/6 flex flex-col mt-3 p-4 font-sans rounded bg-gray-200">
      <div className="mb-3">
        <h1>{name}</h1>
        {url && (
          <a className="opacity-50" href={url}>
            {url}
          </a>
        )}
      </div>
      <dl className="divide-y divide-gray-400">
        <div className="flex my-2">
          <dt className="w-1/5">Date : </dt>
          <dd>
            <time className="opacity-50">{date}</time>
          </dd>
        </div>
        <div className="flex my-2">
          <dt className="w-1/5">Type : </dt>
          <dd className="opacity-50">{type.name}</dd>
        </div>
        <div className="flex my-2">
          <dt className="w-1/5">Adresse : </dt>
          <dd className="opacity-50">{`${address.number} ${address.street} ${address.postalCode} ${address.city}`}</dd>
        </div>
        <div className="flex">
          <div className="flex flex-1 my-2">
            <dt className="mr-2">Heures vendues :</dt>
            <dd className="opacity-50">{soldHours}</dd>
          </div>
          <div className="flex flex-1 my-2">
            <dt className="mr-2">Heure de début :</dt>
            <dd className="opacity-50">{startTime}</dd>
          </div>
          <div className="flex flex-1 my-2">
            <dt className="mr-2">Heure de fin :</dt>
            <dd className="opacity-50">{endTime}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
import Card from "@components/layout/Card/Card";
import { useTodayEvents } from "@api/hooks/useEvents";
import { Event } from "@api/models";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/ErrorAlert/Alert";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const List = styled.ul`
  margin-top: 2rem;
`;
const ListItem = styled.li`
  padding: 1rem;

  &:hover {
    background-color: #c6ced3;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const { data: events, isLoading, isError, error } = useTodayEvents();

  const onSelect = (event: Event) => {
      navigate(`/events/${event.id}`)
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Alert errorMessage={error.message} />;

  return (
    <Card>
      <h1>Événements du jour</h1>
      <List>
        {events &&
          events.map((event, index) => (
            <ListItem key={index}>
              <button
                onClick={() => onSelect(event)}
              >{`${event.name} - ${event.address.name}`}</button>
            </ListItem>
          ))}
      </List>
    </Card>
  );
}

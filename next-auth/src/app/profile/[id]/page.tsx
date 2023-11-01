export default function UserProfile({ params }: any) {
  return (
    <div>
      Profile
      <p>Profile page {params.id}</p>
    </div>
  );
}

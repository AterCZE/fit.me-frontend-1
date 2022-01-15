import { DynamicSite, BusinessProfileTemplate } from "@src/templates";
import { WorkoutPlaceBusinessData } from "@src/dummyData";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_SPORTSGROUND = gql`
	query GetSportsground($username: String!) {
		getSportsground(username: $username) {
			id
			name
			username
			description
			profile_photo {
				location
				name
			}
			tags {
				name
			}
			rating
			reviews {
				stars
				comment
				datetime
				sportsman {
					username
					name
					surname
				}
			}
			address {
				id
				street
				no
				city
				state
				zip_code
			}
			events {
				name
				datetime_from
				datetime_to
			}
			details {
				title
				value
			}
		}
	}
`;

export default function WorkoutPlace() {
	const router = useRouter();
	const { name } = router.query;
	const { loading, error, data } = useQuery(GET_SPORTSGROUND, {
		variables: { username: name },
	});

	return (
		<DynamicSite>
			{!loading && !error && <BusinessProfileTemplate BusinessProfileData={data.getSportsground} />}
		</DynamicSite>
	);
}

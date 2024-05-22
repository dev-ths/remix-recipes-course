import { HeadersArgs, json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import {
	DiscoverRecipeDetails,
	DiscoverRecipeHeader,
} from "~/components/discover"
import db from "~/db.server"
import { getCurrentUser } from "~/utils/auth.server"
import { hash } from "~/utils/cryptography.server"

// sets response headers for the ENTIRE PAGE, not just the loader data => visit the page directly? (not through links) => these headers will be used instead of the loader headers
// etag also needs to be set, in addition to 304 responses, in order to take advantage of the caching strategy
// headers don't have access to the request, but it does have access to the loader headers
export function headers({ loaderHeaders }: HeadersArgs) {
	return {
		etag: loaderHeaders.get("x-page-etag"),
		"Cache-Control": `max-age=3600, stale-while-revalidate=${3600 * 24 * 7}`, //cache page for 1 hour, revalidation page of 1 week (seconds * hours * days)
	}
}

export async function loader({ params, request }: LoaderFunctionArgs) {
	const recipe = await db.recipe.findUnique({
		where: {
			id: params.recipeId,
		},
		include: {
			ingredients: {
				select: {
					name: true,
					id: true,
					amount: true,
				},
			},
		},
	})

	if (recipe === null) {
		throw json(
			{ message: `A recipe with id ${params.id} does not exist` },
			{ status: 404 }
		)
	}

	const etag = hash(JSON.stringify(recipe))

	if (etag === request.headers.get("if-none-match")) {
		return new Response(null, { status: 304 })
	}

	// revalidate cache strategy
	// return json({ recipe }, { headers: { etag, "cache-control": "max-age=5" } })

	const user = await getCurrentUser(request)
	const pageEtag = `${hash(user?.id) ?? "anonymous"}.${etag}`

	// stale-while-revalidate strategy
	return json(
		{ recipe },
		{
			headers: {
				etag,
				"x-page-etag": pageEtag, // pageEtag created in this loader to provide data for headers function
				"cache-control": "max-age=5, stale-while-revalidate=10", //leads to faster page load due to background revalidation
			},
		}
	)
}

export default function DiscoverRecipe() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="md:h-[calc(100vh-1rem) overflow-auto] m-[-1rem]">
			<DiscoverRecipeHeader recipe={data.recipe} />
			<DiscoverRecipeDetails recipe={data.recipe} />
		</div>
	)
}

/* import {
  type HeadersArgs,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  DiscoverRecipeDetails,
  DiscoverRecipeHeader,
} from "~/components/discover";
import db from "~/db.server";
import { getCurrentUser } from "~/utils/auth.server";
import { hash } from "~/utils/cryptography.server";

export function headers({ loaderHeaders }: HeadersArgs) {
  return {
    etag: loaderHeaders.get("x-page-etag"),
    "Cache-Control": `max-age=3600, stale-while-revalidate=${3600 * 24 * 7}`,
  };
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
    include: {
      ingredients: {
        select: {
          id: true,
          name: true,
          amount: true,
        },
      },
    },
  });

  if (recipe === null) {
    throw json(
      {
        message: `A recipe with id ${params.id} does not exist.`,
      },
      { status: 404 }
    );
  }

  const etag = hash(JSON.stringify(recipe));

  if (etag === request.headers.get("if-none-match")) {
    return new Response(null, { status: 304 });
  }

  const user = await getCurrentUser(request);
  const pageEtag = `${hash(user?.id ?? "anonymous")}.${etag}`;

  return json(
    { recipe },
    {
      headers: {
        etag,
        "x-page-etag": pageEtag,
        "cache-control": "max-age=5, stale-while-revalidate=10",
      },
    }
  );
}

export default function DiscoverRecipe() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="md:h-[calc(100vh-1rem)] m-[-1rem] overflow-auto">
      <DiscoverRecipeHeader recipe={data.recipe} />
      <DiscoverRecipeDetails recipe={data.recipe} />
    </div>
  );
}
 */

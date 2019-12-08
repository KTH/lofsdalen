# Lofsdalen

Get git commit date or full commit from Github for a repo.

## Full commit information
`http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f`

```json
{
  "sha": "4b1c21f1db8abbf4da8c3132a139b0fdd28728ac",
  "node_id": "MDY6Q29tbWl0MjI1ODUzMzg4OjRiMWMyMWYxZGI4YWJiZjRkYThjMzEzMmExMzliMGZkZDI4NzI4YWM=",
  "commit": {
    "author": {
      "name": "Patric Jansson",
      "email": "paddy@kth.se",
      "date": "2019-12-04T11:41:29Z"
    },
    "committer": {
      "name": "GitHub",
      "email": "noreply@github.com",
      "date": "2019-12-04T11:41:29Z"
    },
    "message": "Create README.md",
    "tree": {
      "sha": "d6c0ecb084d4a27168ab81ddbea7219dfd8e2203",
      "url": "https://api.github.com/repos/KTH/lofsdalen/git/trees/d6c0ecb084d4a27168ab81ddbea7219dfd8e2203"
    },
    "url": "https://api.github.com/repos/KTH/lofsdalen/git/commits/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac",
    "comment_count": 0,
    "verification": {
      "verified": true,
      "reason": "valid",
      "signature": "-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJd55tpCRBK7hj4Ov3rIwAAdHIIAG3IyHDVCThok1hvb0DFYtmG\nPmoUx/vgFmIYtqw7tQEg+LuYjpqRg8wXHy2brEgKZLqiOwdTCVX+Jg2dgly+r6wr\n3WLiQZviJMFTWWvnPPbA/QY0Pu1y51Mv3EdP6KnQlMlpbRhzXuVAp66EhxK+3W2u\nyoBGc3/g5R5gm4dQzCfEg5ohC+gv0AiHCDX56F1wlkON7XBdEn6CE1FsTwKs9VuA\n4vYQQlQ4FaKNs+Qekd9Bpb0Z1SWq3IhsdOjrmCFG64VJ88fkB+nx9kqVWxDDjcuP\nnkHATf7XG5FcLj0PtBTiNCrXlc2SLjqmf2KA6gngZVBzEBWlURWOkbi+Ja396P4=\n=rCDq\n-----END PGP SIGNATURE-----\n",
      "payload": "tree d6c0ecb084d4a27168ab81ddbea7219dfd8e2203\nparent ba8d807f8d2eeea8642f49d3c011bf310e3c2ba1\nauthor Patric Jansson <paddy@kth.se> 1575459689 +0100\ncommitter GitHub <noreply@github.com> 1575459689 +0100\n\nCreate README.md"
    }
  },
  "url": "https://api.github.com/repos/KTH/lofsdalen/commits/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac",
  "html_url": "https://github.com/KTH/lofsdalen/commit/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac",
  "comments_url": "https://api.github.com/repos/KTH/lofsdalen/commits/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac/comments",
  "author": {
    "login": "patricjansson",
    "id": 585139,
    "node_id": "MDQ6VXNlcjU4NTEzOQ==",
    "avatar_url": "https://avatars0.githubusercontent.com/u/585139?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/patricjansson",
    "html_url": "https://github.com/patricjansson",
    "followers_url": "https://api.github.com/users/patricjansson/followers",
    "following_url": "https://api.github.com/users/patricjansson/following{/other_user}",
    "gists_url": "https://api.github.com/users/patricjansson/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/patricjansson/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/patricjansson/subscriptions",
    "organizations_url": "https://api.github.com/users/patricjansson/orgs",
    "repos_url": "https://api.github.com/users/patricjansson/repos",
    "events_url": "https://api.github.com/users/patricjansson/events{/privacy}",
    "received_events_url": "https://api.github.com/users/patricjansson/received_events",
    "type": "User",
    "site_admin": false
  },
  "committer": {
    "login": "web-flow",
    "id": 19864447,
    "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
    "avatar_url": "https://avatars3.githubusercontent.com/u/19864447?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/web-flow",
    "html_url": "https://github.com/web-flow",
    "followers_url": "https://api.github.com/users/web-flow/followers",
    "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
    "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
    "organizations_url": "https://api.github.com/users/web-flow/orgs",
    "repos_url": "https://api.github.com/users/web-flow/repos",
    "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
    "received_events_url": "https://api.github.com/users/web-flow/received_events",
    "type": "User",
    "site_admin": false
  },
  "parents": [
    {
      "sha": "ba8d807f8d2eeea8642f49d3c011bf310e3c2ba1",
      "url": "https://api.github.com/repos/KTH/lofsdalen/commits/ba8d807f8d2eeea8642f49d3c011bf310e3c2ba1",
      "html_url": "https://github.com/KTH/lofsdalen/commit/ba8d807f8d2eeea8642f49d3c011bf310e3c2ba1"
    }
  ],
  "stats": { "total": 2, "additions": 2, "deletions": 0 },
  "files": [
    {
      "sha": "0e7d9f91b3ee5c4f050e07e1db251e077baa59ca",
      "filename": "README.md",
      "status": "added",
      "additions": 2,
      "deletions": 0,
      "changes": 2,
      "blob_url": "https://github.com/KTH/lofsdalen/blob/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac/README.md",
      "raw_url": "https://github.com/KTH/lofsdalen/raw/4b1c21f1db8abbf4da8c3132a139b0fdd28728ac/README.md",
      "contents_url": "https://api.github.com/repos/KTH/lofsdalen/contents/README.md?ref=4b1c21f1db8abbf4da8c3132a139b0fdd28728ac",
      "patch": "@@ -0,0 +1,2 @@\n+# Lofsdalen\n+CD pipeline timer from git push to production."
    }
  ]
}
```

## Information about when a commit was done

`http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f/when`

```json
{
  "commited": "2019-12-04T11:41:29Z",
  "commitedTimestamp": 1575459689,
  "nowTimestamp": 1575835581.242,
  "durationMs": 375892.242000103,
  "readable": "4 days ago"
}
```

# Lofsdalen

Get git commit date or full commit from Github for a repo.

## Full commit information
`http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f`


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

## Test 
Test in Docker 🐳 `npm run test-integration-in-docker`.
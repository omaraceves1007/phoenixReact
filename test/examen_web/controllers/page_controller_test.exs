defmodule ExamenWeb.PageControllerTest do
  use ExamenWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "mountPoint!"
  end
end

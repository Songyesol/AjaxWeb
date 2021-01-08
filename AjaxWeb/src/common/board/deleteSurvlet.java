package common.board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/deleteBoard")
public class deleteSurvlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public deleteSurvlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String no = request.getParameter("No");
		int boardNo = Integer.parseInt(no);
		
		boardVO vo = new boardVO();
		vo.setBoardNo(boardNo);
		
		boardDAO dao=new boardDAO();
		if(dao.deleteBoard(vo)) {
			response.getWriter().append("<h1>OK</h1>");	
		}else {
			response.getWriter().append("<h1>NG</h1>");	
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}

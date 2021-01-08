package common.board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/updateBoard")
public class updateBoardServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
    public updateBoardServ() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	String no = request.getParameter("No");
	String title = request.getParameter("title");
	String content = request.getParameter("content");
	String writer = request.getParameter("writer");

	int boardNo = Integer.parseInt(no);
	
	boardVO vo = new boardVO();
	vo.setBoardNo(boardNo);
	vo.setTitle(title);
	vo.setContent(content);
	vo.setWriter(writer);
	
	boardDAO dao = new boardDAO();
	 if(dao.updateBrd(vo)){ 
		 response.getWriter().append("<h1>OK</h1>"); 
	 } else {
		 response.getWriter().append("<h1>NG</h1>"); 
	 }
	
	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}

/**
 * 
 */
package com.vtth.food.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vtth.food.entity.TblFood;
import com.vtth.food.util.HibernateUtil;

@Repository
public class FoodDAOImp implements FoodDAO {

    public FoodDAOImp() {
        System.out.println("FoodDAOImpl()");
    }

    @Autowired
    private HibernateUtil hibernateUtil;

    public List<TblFood> getFood() {
        return hibernateUtil.fetchAll(TblFood.class);
    }

    public TblFood getFoodID(int ID) {
        // TODO Auto-generated method stub
        return hibernateUtil.fetchById(ID, TblFood.class);
    }

    public TblFood updateFood(TblFood newfood) {
        // TODO Auto-generated method stub
        return hibernateUtil.update(newfood);
    }

    public void deleteFood(int ID) {
        // TODO Auto-generated method stub
        hibernateUtil.delete(ID, TblFood.class);
    }

    public Serializable createFood(TblFood newFood) {
        // TODO Auto-generated method stub
        return hibernateUtil.create(newFood);
    }

    public TblFood incrVisitNum(int id) {
        TblFood food = hibernateUtil.fetchById(id, TblFood.class);
        food.setVisitNum(food.getVisitNum() + 1);
        return hibernateUtil.update(food);
    }

    public List<TblFood> searchByMaterial(String materials, int start, int limit) {
        String[] searchs = materials.split("-");
        if (searchs.length > 0) {
            String query = String.format(" WHERE listMaterial LIKE '%s'", ("%" + searchs[0] + "%"));
            for (int i = 1; i < searchs.length; i++) {
                String tmp = String.format(" AND listMaterial LIKE '%s'", ("%" + searchs[i] + "%"));
                query += tmp;
            }
            query += " ORDER BY visitNum DESC";
            return hibernateUtil.fetchAllByQuery(query, start, limit, TblFood.class);
        }
        return null;
    }
}
